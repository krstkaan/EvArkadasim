import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { login } from '../redux/UserSlice';
import { useDispatch } from 'react-redux';

const SignupPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    //const dispatch = useDispatch();

    const handleSignup = async () => {
        if (!email || !password || !username) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            let formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('username', username);
            
            // const response = await axios.post('http://192.168.1.105:8000/signup.php', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     },
            // });
            console.log(response.data);
            if (response.data.sonuc === '0') {
                Alert.alert('Hata', response.data.mesaj, [{ text: 'Tamam' }]);
            } else {
                const token = response.data.token;

                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('username', response.data.username);

                setEmail('');
                setPassword('');
                setUsername('');
                //dispatch(login(token));
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
            <Text style={styles.label}>Kullanıcı Adı</Text>
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Kullanıcı Adı"
                placeholderTextColor="#888"
                style={styles.input}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
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
                <Text style={styles.loginText}>Zaten üye misin? Giriş yap!</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 12,
        padding: 12,
        marginBottom: 20,
        backgroundColor: '#fff',
        fontSize: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    button: {
        backgroundColor: '#4e9c2e',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '700',
    },
    loginButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginText: {
        color: '#4e9c2e',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default SignupPage;