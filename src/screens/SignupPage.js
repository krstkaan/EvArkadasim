import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Token kaydetmek için AsyncStorage
//import { login } from '../redux/UserSlice';
//import { useDispatch } from 'react-redux';
import styles from '../../assets/styles/style';

const SignupPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayname] = useState('');
    //const dispatch = useDispatch();

    const handleSignup = async () => {
        if (!email || !password || !displayName) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            let formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('displayname', displayName);

            const response = await axios.post('https://roomiefies.com/app/register.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.sonuc === '0') {
                Alert.alert('Hata', response.data.mesaj, [{ text: 'Tamam' }]);
            } else if(response.data.sonuc === '1') {
                // Başarılı ise token'ı al ve kaydet
                console.log(response.data);
                const token = response.data.token;

                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('displayName', response.data.displayname);

                setEmail('');
                setPassword('');
                setDisplayname('');
                //dispatch(login(token));
            }else{
            console.log("else ici:" + response.data);
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
                <Text style={styles.label}>Ad Soyad</Text>
                <TextInput
                    value={displayName}
                    onChangeText={setDisplayname}
                    placeholder="John Doe"
                    placeholderTextColor="#888"
                    style={styles.input}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="johndoe@gmail.com"
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                    style={styles.input}
                />
                <Text style={styles.label}>Şifre</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Şifre"
                    secureTextEntry
                    placeholderTextColor="#888"
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Kayıt Ol</Text>
                </TouchableOpacity>

                {/* Zaten üye misin? Giriş yap butonu */}
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('LoginPage')} // LoginPage.js'e yönlendirme
                >
                    <Text style={styles.forwardText}>Zaten üye misin? Giriş yap!</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default SignupPage;