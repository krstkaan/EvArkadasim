import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import styles from '../../assets/styles/style';

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //const dispatch = useDispatch();

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
            } else {
                const token = response.data.token;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('email', email);
                setEmail('');
                setPassword('');
                // dispatch(login(token));
                // if (response.data.yetki == "helios") {
                //     dispatch(adminlogin(token));
                // }
            }

        } catch (error) {
            console.log(error);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.', [{ text: 'Tamam' }]);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/backgroundlogin.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#888"
                />

                <Text style={styles.label}>Şifre</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Şifre"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#888"
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
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

