import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const MyFavAdsPage = () => {
    const [userID, setuserID] = useState('');
    const [favAds, setFavAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigation = useNavigation();


    const fetchUserID = async () => {
        try {
            const storedUserID = await AsyncStorage.getItem('userID');
            if (storedUserID) {
                setuserID(storedUserID);
                console.log('userID:', storedUserID);
                fetchFavAds(storedUserID);
            }
        } catch (error) {
            console.log('Error fetching userID:', error);
            setError("Kullanıcı ID alınırken bir sorun oluştu.");
            setLoading(false);
        }
    };


    const fetchFavAds = async (userID) => {
      if (!userID) return; // userId yoksa yükleme yapma

        setLoading(true);
        setError(null);
        try {
            const formData = new FormData();
            formData.append('userID', userID);

            const response = await fetch(
                'https://roomiefies.com/app/getuserfavilan.php',
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
                setFavAds(data);
            }
        } catch (error) {
            console.error('Error fetching favorite ads:', error);
            setError("Favori ilanlar alınırken bir sorun oluştu.");
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


    if (loading) {
        return <View style={styles.center}><Text>Yükleniyor...</Text></View>;
    }

    if (error) {
        return <View style={styles.center}><Text>Hata: {error}</Text></View>;
    }

    if (!favAds || favAds.length === 0) {
        console.log("favAds Dizisi Boş:", favAds);
        return <View style={styles.center}>
            <Text>Favori ilanınız bulunmamaktadır.</Text>
        </View>;
    }


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.adsContainer}>
                    {favAds.map((ad, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.adContainer}
                            onPress={() => handleCardPress(ad.id)}
                        >
                            <Image
                                source={{ uri: `https://roomiefies.com/app/${ad.imageurl1}` }}
                                style={styles.adImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.adTitle}>{ad.title}</Text>
                            <Text style={styles.adPrice}>{ad.rent} TL</Text>
                            <Text style={styles.adUser}>İlan Sahibi: {ad.displayName}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default MyFavAdsPage;

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
    adPrice: {
        fontSize: 14,
        color: 'green',
        paddingHorizontal: 8,
    },
    adUser: {
        fontSize: 12,
        color: 'gray',
        paddingHorizontal: 8,
        paddingBottom: 8
    },
    endMessage: {
        textAlign: 'center',
        padding: 10,
        color: 'gray',
    },
});