import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const MyAdsPage = () => {
    const [userID, setuserID] = useState('');
    const [myAds, setMyAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const fetchUserID = async () => {
        try {
            const storedUserID = await AsyncStorage.getItem('userID');
            if (storedUserID) {
                setuserID(storedUserID);
                console.log('userID:', storedUserID);
                fetchMyAds(storedUserID);
            }
        } catch (error) {
            console.log('Error fetching userID:', error);
            setError("Kullanıcı ID alınırken bir sorun oluştu.");
            setLoading(false);
        }
    };


    const fetchMyAds = async (userID) => {
        if (!userID) return; // userId yoksa yükleme yapma
        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('userID', userID);

            const response = await fetch(
                'https://roomiefies.com/app/getuserilan.php',
                {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
             console.log("API'den gelen veri:", data);

            if (data) {
                setMyAds(data);
            }
        } catch (error) {
            console.error('Error fetching my ads:', error);
            setError("İlanlarınız alınırken bir sorun oluştu.");
        } finally {
            setLoading(false);
        }
    };
    useFocusEffect(
        useCallback(() => {
            fetchUserID();
        }, [])
    );

    const handleCardPress = (id) => {
        navigation.navigate('AdDetailsPage', { id });
    };

    const handleEditPress = (id) => {
        navigation.navigate('EditAdPage', { id });
    };

    if (loading) {
        return <View style={styles.center}><Text>Yükleniyor...</Text></View>;
    }

    if (error) {
        return <View style={styles.center}><Text>Hata: {error}</Text></View>;
    }


    if (!myAds || myAds.length === 0) {
        return <View style={styles.center}>
            <Text>Henüz ilanınız bulunmamaktadır.</Text>
        </View>;
    }

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.adsContainer}>
                    {myAds.map((ad, index) => (
                        <View key={index} style={styles.adContainer}>
                            <TouchableOpacity style={{ flex: 1 }} onPress={() => handleCardPress(ad.id)}>
                                <Image
                                    source={{ uri: `https://roomiefies.com/app/${ad.imageurl1}` }}
                                    style={styles.adImage}
                                    resizeMode="cover"
                                />
                                <Text style={styles.adTitle}>{ad.title}</Text>
                                <View style={styles.priceAndEditContainer}>
                                    <Text style={styles.adPrice}>{ad.rent} TL</Text>
                                    <TouchableOpacity style={styles.editButton} onPress={() => handleEditPress(ad.id)}>
                                        <Text style={styles.editButtonText}>İlanı Düzenle</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};


export default MyAdsPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
    adsContainer: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginBottom: 50,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    adContainer: {
        width: '100%',
        marginVertical: 10,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    adImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    adTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 8,
    },
   priceAndEditContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
         paddingHorizontal: 8,
        paddingBottom: 8,
    },
    adPrice: {
        fontSize: 14,
        color: 'green',
         flex: 1,
    },
    editButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
         backgroundColor: '#e0e0e0',
         borderRadius: 4,
    },
    editButtonText:{
         color: 'blue',
         fontSize: 13,
    },
    endMessage: {
        textAlign: 'center',
        padding: 10,
        color: 'gray',
    },
});