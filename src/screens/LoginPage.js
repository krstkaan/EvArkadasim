import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { login } from '../redux/UserSlice';
import styles from '../../assets/styles/style';

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(true); // Auto-login sırasında yüklenme durumu
    const dispatch = useDispatch();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    console.log('Token bulundu:', token);

                    // Auto-login işlemi için backend'e istek gönder
                    const response = await axios.post('https://roomiefies.com/app/autologin.php', { token });

                    console.log('Auto-login yanıtı:', response.data);

                    if (response.data.isAuth) {
                        // Eğer doğrulama başarılıysa Redux'a kullanıcıyı giriş yaptır ve onboarding'e yönlendir
                         dispatch(login(token));
                    } else {
                        console.log('Auto-login başarısız.');
                    }
                } else {
                    console.log('Token bulunamadı.');
                }
            } catch (error) {
                console.error('Auto-login sırasında hata:', error);
            } finally {
                setIsLoading(false); // Yüklenme durumunu kaldır
            }
        };

        checkToken();
    }, [dispatch, navigation]);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            let formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await axios.post('https://roomiefies.com/app/login.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log(response.data);

            if (response.data.sonuc === '0') {
                Alert.alert('Hata', response.data.mesaj, [{ text: 'Tamam' }]);
            } else if (response.data.sonuc === '1') {
                const displayname = response.data.displayname;
                const userID = response.data.userId;
                console.log(response.data);
                const token = response.data.token;
                 const receivedEmail = email; //inputtan gelen email alınır
                const birthdate = response.data.birthdate;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('displayname', displayname);
                await AsyncStorage.setItem('email', receivedEmail); // inputtan alınan email kaydedilir
                await AsyncStorage.setItem('userID', userID);
                await AsyncStorage.setItem('birthdate', birthdate);

                setEmail('');
                setPassword('');
                dispatch(login(token));
            }

        } catch (error) {
            console.log(error);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.', [{ text: 'Tamam' }]);
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../../assets/images/backgroundlogin.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.loginContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.inputlogin}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />

                <Text style={styles.label}>Şifre</Text>
                <TextInput
                    style={styles.inputlogin}
                    placeholder="Şifre"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />

                <TouchableOpacity style={styles.buttonlogin} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Giriş Yap</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.signupButton}
                    onPress={() => navigation.navigate('SignupPage')}
                >
                    <Text style={styles.forwardText}>Henüz üye değil misin? Hemen kayıt ol!</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}