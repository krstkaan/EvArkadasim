import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const EditProfileScreen = () => {
    const [profileImage, setProfileImage] = useState({ uri: 'https://via.placeholder.com/150' });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const navigation = useNavigation();


    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const displayname = await AsyncStorage.getItem('displayname');
                const email = await AsyncStorage.getItem('email');
                const birthdate = await AsyncStorage.getItem('birthdate');
                
                setName(displayname || '');
                setEmail(email || '');
                if (birthdate) {
                    const parsedDate = new Date(birthdate);
                    setBirthDate(parsedDate);
                }

            } catch (error) {
                console.error('Veriler yüklenirken hata:', error);
            }
        };

        loadProfileData();
    }, []);

    const pickImage = async () => {
        Alert.alert(
            'Seçim Yapın',
            'Bir fotoğraf çekmek mi yoksa galeriden seçmek mi istersiniz?',
            [
                {
                    text: 'Galeri',
                    onPress: async () => {
                        try {
                            const result = await ImagePicker.launchImageLibraryAsync({
                                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                                allowsEditing: true,
                                aspect: [1, 1],
                                quality: 1,
                            });
                            if (!result.canceled) {
                                setProfileImage({ uri: result.assets[0].uri });
                            }
                        } catch (error) {
                            console.error('Galeri hatası:', error);
                        }
                    },
                },
                {
                    text: 'Kamera',
                    onPress: async () => {
                        try {
                            const result = await ImagePicker.launchCameraAsync({
                                allowsEditing: true,
                                aspect: [1, 1],
                                quality: 1,
                            });
                            if (!result.canceled) {
                                setProfileImage({ uri: result.assets[0].uri });
                            }
                        } catch (error) {
                            console.error('Kamera hatası:', error);
                        }
                    },
                },
                { text: 'İptal', style: 'cancel' },
            ]
        );
    };

     const saveProfile = async () => {
       try {
        let formData = new FormData();
          formData.append('email', email);
          formData.append('displayname', name);

        const formattedBirthDate = birthDate ? birthDate.toISOString().split('T')[0] : null;
          formData.append('birthdate',formattedBirthDate);
       
          const response = await axios.post('https://roomiefies.com/app/editprofile.php', formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });
           if (response.data.sonuc === '0') {
                Alert.alert('Hata', response.data.mesaj, [{ text: 'Tamam' }]);
            }
            else if (response.data.sonuc === '1') {
                 await AsyncStorage.setItem('displayname', name);
                if(formattedBirthDate)
                    await AsyncStorage.setItem('birthdate', formattedBirthDate);

                 Alert.alert('Başarılı', response.data.mesaj, [{ text: 'Tamam' }]);
                 navigation.navigate('MyAccountPage');
            }
            console.log(response.data);
        
       } catch(error){
            console.log(error);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.', [{ text: 'Tamam' }]);
       }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={pickImage}>
                <Image source={profileImage} style={styles.profileImage} />
            </TouchableOpacity>

            <View style={styles.form}>
                <Text style={styles.label}>İsim</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    editable={false} // Email adresinin değiştirilmesini engelledik.
                />

                <Text style={styles.label}>Doğum Tarihi</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <TextInput
                        style={styles.input}
                        value={birthDate ? birthDate.toLocaleDateString() : ''}
                        editable={false}
                        placeholder=""
                    />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={birthDate || new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setBirthDate(selectedDate);
                            }
                        }}
                    />
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={saveProfile}>
                <Text style={styles.buttonText}>Profili Düzenle</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#ccc',
        marginBottom: 10,
        marginTop: 5,
    },
    form: {
        width: '100%',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 15,
        backgroundColor: '#f9f9f9',
        width: '100%',
    },
    button: {
        backgroundColor: '#4e9c2e',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
        marginTop: 5,
        marginBottom: 60,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditProfileScreen;