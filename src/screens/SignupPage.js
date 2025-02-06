import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../assets/styles/style';

const SignupPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayname] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        if (!email || !password || !displayName) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        setLoading(true);
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
            } else if (response.data.sonuc === '1') {
                // Token'ı kaydetmiyoruz ve diğer bilgileri de kaydetmiyoruz
                // çünkü kullanıcı henüz onaylanmadı
                
                setEmail('');
                setPassword('');
                setDisplayname('');
            
                Alert.alert(
                    "Başarılı",
                    "Kayıt isteğiniz onaya gönderildi.",
                    [{
                        text: "Tamam",
                        onPress: () => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'LoginPage' }],
                            });
                        }
                    }]
                );
            } else {
                console.log("else ici:" + response.data);
                Alert.alert('Hata', 'Kayıt işlemi başarısız oldu.', [{ text: 'Tamam' }]);
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar deneyin.', [{ text: 'Tamam' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/images/backgroundlogin.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.loginContainer}>
                <Text style={styles.label}>Ad Soyad</Text>
                <TextInput
                    value={displayName}
                    onChangeText={setDisplayname}
                    placeholder="John Doe"
                    placeholderTextColor="#888"
                    style={styles.inputlogin}
                    editable={!loading}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="johndoe@gmail.com"
                    keyboardType="email-address"
                    placeholderTextColor="#888"
                    style={styles.inputlogin}
                    editable={!loading}
                />
                <Text style={styles.label}>Şifre</Text>
                <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Şifre"
                    secureTextEntry
                    placeholderTextColor="#888"
                    style={styles.inputlogin}
                    editable={!loading}
                />
                <TouchableOpacity
                    style={[styles.buttonlogin, loading && { opacity: 0.6 }]}
                    onPress={handleSignup}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>{loading ? 'Kaydediliyor...' : 'Kayıt Ol'}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate('LoginPage')}
                >
                    <Text style={styles.forwardText}>Zaten üye misin? Giriş yap!</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default SignupPage;