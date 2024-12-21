// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';
// import CustomButton from '../components/component/CustomButton';
// import Loading from '../components/component/Loading';


// const ProfileEditPage = () => {
//     const [photo, setPhoto] = useState(null);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [dob, setDob] = useState('');
//     const [country, setCountry] = useState('');

//     // Fotoğraf seçme işlemi
//     const handleSelectPhoto = () => {
//         launchImageLibrary({ mediaType: 'photo' }, (response) => {
//             if (response.assets && response.assets.length > 0) {
//                 setPhoto(response.assets[0].uri);
//             }
//         });
//     };

//     // Fotoğrafı silme işlemi
//     const handleRemovePhoto = () => {
//         Alert.alert(
//             "Fotoğraf Sil",
//             "Fotoğrafı silmek istediğinizden emin misiniz?",
//             [
//                 {
//                     text: "Evet",
//                     onPress: () => setPhoto(null),
//                 },
//                 {
//                     text: "Hayır",
//                     style: "cancel",
//                 },
//             ]
//         );
//     };

//     // Profil bilgilerini kaydetme
//     const handleSave = () => {
//         console.log('Profile saved:', { name, email, password, dob, country });
//     };

//     return (
//         <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 90 }}>
//             {/* Profil Fotoğrafı Seçme ve Silme Alanı */}
//             <View style={styles.photoContainer}>
//                 <TouchableOpacity onPress={handleSelectPhoto}>
//                     {photo ? (
//                         <View style={styles.photoContainer}>
//                             <Image source={{ uri: photo }} style={styles.profilePhoto} />
//                             <TouchableOpacity onPress={handleRemovePhoto} style={styles.removePhotoButton}>
//                                 <Text style={styles.removePhotoText}>X</Text>
//                             </TouchableOpacity>
//                         </View>
//                     ) : (
//                         <View style={styles.defaultPhoto}>
//                             <Text style={styles.defaultText}>+ Fotoğraf Seç</Text>
//                         </View>
//                     )}
//                 </TouchableOpacity>
//             </View>

//             {/* Profil Bilgileri Formu */}
//             <View style={styles.formContainer}>
//                 <Text style={styles.inputLabel}>İsim</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={name}
//                     onChangeText={setName}
//                     placeholder="İsminizi girin"
//                 />

//                 <Text style={styles.inputLabel}>E-posta</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={email}
//                     onChangeText={setEmail}
//                     placeholder="E-postanızı girin"
//                     keyboardType="email-address"
//                 />

//                 <Text style={styles.inputLabel}>Şifre</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={password}
//                     onChangeText={setPassword}
//                     placeholder="Şifrenizi girin"
//                     secureTextEntry
//                 />

//                 <Text style={styles.inputLabel}>Doğum Günü</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={dob}
//                     onChangeText={setDob}
//                     placeholder="Doğum tarihinizi girin"
//                 />

//                 <Text style={styles.inputLabel}>Ülke</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={country}
//                     onChangeText={setCountry}
//                     placeholder="Ülkenizi girin"
//                 />

//                 <Button title="Kaydet" onPress={handleSave} />
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     photoContainer: {
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     profilePhoto: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         borderWidth: 2,
//         borderColor: '#ddd',
//     },
//     removePhotoButton: {
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         backgroundColor: 'red',
//         borderRadius: 10,
//         padding: 5,
//     },
//     removePhotoText: {
//         color: '#fff',
//         fontSize: 16,
//     },
//     defaultPhoto: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         borderWidth: 2,
//         borderColor: '#ddd',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0',
//     },
//     defaultText: {
//         fontSize: 16,
//         color: '#888',
//     },
//     formContainer: {
//         marginTop: 20,
//     },
//     inputLabel: {
//         fontSize: 16,
//         marginBottom: 5,
//         color: '#333',
//     },
//     input: {
//         height: 40,
//         borderColor: '#ddd',
//         borderWidth: 1,
//         borderRadius: 5,
//         paddingLeft: 10,
//         marginBottom: 15,
//     },
// });

// export default ProfileEditPage;


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Modal, Alert, Button } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { StatusBar } from 'expo-status-bar';
// import { Ionicons } from '@expo/vector-icons';

// const ProfileEditPage = () => {
//     const [image, setImage] = useState(null);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [dob, setDob] = useState('');
//     const [country, setCountry] = useState('');
//     const [resimmodalVisible, setResimmodalVisible] = useState(false);
//     const [error, setError] = useState(null);
//     const [userID, setUserID] = useState('');

//     useEffect(() => {
//         const fetchuserID = async () => {
//             try {
//                 const userID = await AsyncStorage.getItem('userID');
//                 if (userID) {
//                     setUserID(userID);
//                 } else {
//                     console.log('Kullanıcı ID alınamadı.');
//                 }
//             } catch (error) {
//                 console.log('Error fetching userID:', error);
//             }
//         };
//         fetchuserID();
//     }, []);

//     const pickimage = async () => {
//         try {
//             let result = await ImagePicker.launchImageLibraryAsync({
//                 mediaTypes: ImagePicker.MediaTypeOptions.Images,
//                 allowsEditing: true,
//                 aspect: [1, 1], // Daire şekli için en-boy oranı
//                 quality: 0.5,
//             });

//             if (!result.cancelled) {
//                 const manipulatedImage = await ImageManipulator.manipulateAsync(
//                     result.uri,
//                     [{ resize: { width: 200 } }], // Resize image
//                     { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
//                 );
//                 setImage(manipulatedImage.uri);
//             }
//         } catch (error) {
//             console.log("Galeri hatası:", error);
//         }
//     };

//     const handleSubmit = () => {
//         if (!name || !email || !password || !dob || !country || !image) {
//             alert('Lütfen tüm alanları doldurunuz.');
//             return;
//         }
//         sendData();
//     };

//     const sendData = async () => {
//         try {
//             let formData = new FormData();
//             formData.append('name', name);
//             formData.append('email', email);
//             formData.append('password', password);
//             formData.append('dob', dob);
//             formData.append('country', country);
//             formData.append('userID', userID);

//             if (image) {
//                 formData.append('image', {
//                     uri: image,
//                     name: 'profile.jpg',
//                     type: 'image/jpeg',
//                 });
//             }

//             const response = await axios.post('https://roomiefies.com/app/ilansave.php', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             console.log('Gönderilen veri:', response.data);

//             if (response.data.sonuc === 1) {
//                 Alert.alert('Başarılı', 'Bilgileriniz başarıyla güncellendi!');
//                 // Formu sıfırlayın
//                 resetForm();
//             } else {
//                 Alert.alert('Hata', response.data.mesaj || 'Bir hata oluştu.');
//             }
//         } catch (error) {
//             console.error('Gönderim hatası:', error);
//             Alert.alert('Hata', 'Bir sorun oluştu. Lütfen tekrar deneyin.');
//         }
//     };

//     const resetForm = () => {
//         setName('');
//         setEmail('');
//         setPassword('');
//         setDob('');
//         setCountry('');
//         setImage(null);
//     };


//     return (
//         <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainerStyle}>
//             <Modal
//                 visible={resimmodalVisible}
//                 transparent={true}
//                 animationType="fade"
//                 onRequestClose={() => setResimmodalVisible(false)}
//             >
//                 <StatusBar backgroundColor='rgba(0,0,0,0.8)' barStyle="light-content" />
//                 <TouchableOpacity style={styles.modalContainer} onPress={() => setResimmodalVisible(false)}>
//                     <Image source={{ uri: image }} style={styles.fullImageIlan} />
//                 </TouchableOpacity>
//             </Modal>

//             {/* Profil Fotoğrafı Seçim Alanı */}
//             <View style={styles.profileContainer}>
//                 <TouchableOpacity onPress={pickimage} style={styles.profileImageContainer}>
//                     {image ? (
//                         <Image source={{ uri: image }} style={styles.profileImage} />
//                     ) : (
//                         <Ionicons name="person-circle-outline" size={100} color="gray" />
//                     )}
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.formContainer}>
//                 <Text style={styles.inputLabel}>İsim</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={name}
//                     onChangeText={setName}
//                     placeholder="İsminizi girin"
//                 />

//                 <Text style={styles.inputLabel}>E-posta</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={email}
//                     onChangeText={setEmail}
//                     placeholder="E-postanızı girin"
//                     keyboardType="email-address"
//                 />

//                 <Text style={styles.inputLabel}>Şifre</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={password}
//                     onChangeText={setPassword}
//                     placeholder="Şifrenizi girin"
//                     secureTextEntry
//                 />

//                 <Text style={styles.inputLabel}>Doğum Günü</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={dob}
//                     onChangeText={setDob}
//                     placeholder="Doğum tarihinizi girin"
//                 />

//                 <Text style={styles.inputLabel}>Ülke</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={country}
//                     onChangeText={setCountry}
//                     placeholder="Ülkenizi girin"
//                 />

//                 <Button title="Kaydet" onPress={handleSubmit} />
//             </View>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     contentContainerStyle: {
//         flex: 1,
//         backgroundColor: '#f5f5f5',
//         padding: 20,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.8)',
//     },
//     fullImageIlan: {
//         width: '100%',
//         height: '100%',
//         resizeMode: 'contain',
//     },
//     profileContainer: {
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     profileImageContainer: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#e0e0e0',
//         marginBottom: 10,
//     },
//     profileImage: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//     },
//     formContainer: {
//         marginBottom: 20,
//     },
//     inputLabel: {
//         fontSize: 16,
//         color: '#333',
//         marginBottom: 5,
//     },
//     input: {
//         height: 40,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         borderRadius: 8,
//         paddingLeft: 10,
//         marginBottom: 15,
//         backgroundColor: '#fff',
//     },
// });

// export default ProfileEditPage;

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Modal, Button, Alert, StatusBar } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as ImageManipulator from 'expo-image-manipulator';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ProfileEditPage = () => {
//     const [image, setImage] = useState(null);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [dob, setDob] = useState('');
//     const [country, setCountry] = useState('');
//     const [resimmodalVisible, setResimmodalVisible] = useState(false);
//     const [userID, setUserID] = useState(''); // Kullanıcı adını saklamak için state

//     useEffect(() => {
//         const fetchuserID = async () => {
//             try {
//                 const userID = await AsyncStorage.getItem('userID');
//                 if (userID) {
//                     setUserID(userID); // Kullanıcı adını state'e aktar
//                 } else {
//                     console.log('Kullanıcı ID alınamadı.');
//                 }
//             } catch (error) {
//                 console.log('Error fetching userID:', error);
//             }
//         };

//         fetchuserID();
//     }, []);

//     const pickImage = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsEditing: true,
//             aspect: [1, 1], // Daire şeklinde bir görüntü seçilmesi için
//             quality: 0.5,
//         });

//         if (!result.canceled) {
//             const manipulatedImage = await ImageManipulator.manipulateAsync(
//                 result.assets[0].uri,
//                 [{ resize: { width: 500 } }],
//                 { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
//             );
//             setImage(manipulatedImage.uri); // İşlenmiş resmi kaydediyoruz.
//         }
//     };

//     const handleSubmit = () => {
//         if (!name || !email || !password || !dob || !country || !image) {
//             alert('Lütfen tüm alanları doldurunuz.');
//             return;
//         }
//         // Form verilerini gönder
//         sendData();
//     };

//     const sendData = async () => {
//         try {
//             let formData = new FormData();
//             formData.append('name', name);
//             formData.append('email', email);
//             formData.append('password', password);
//             formData.append('dob', dob);
//             formData.append('country', country);
//             formData.append('userID', userID);

//             if (image) {
//                 formData.append('image', {
//                     uri: image,
//                     name: 'profile.jpg',
//                     type: 'image/jpeg',
//                 });
//             }

//             const response = await axios.post('https://roomiefies.com/app/ilansave.php', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//             });

//             console.log('Gönderilen veri:', response.data);

//             if (response.data.sonuc === 1) {
//                 Alert.alert('Başarılı', 'Bilgileriniz başarıyla güncellendi!');
//                 // Formu sıfırlayın
//                 resetForm();
//             } else {
//                 Alert.alert('Hata', response.data.mesaj || 'Bir hata oluştu.');
//             }
//         } catch (error) {
//             console.error('Gönderim hatası:', error);
//             Alert.alert('Hata', 'Bir sorun oluştu. Lütfen tekrar deneyin.');
//         }
//     };

//     const resetForm = () => {
//         setName('');
//         setEmail('');
//         setPassword('');
//         setDob('');
//         setCountry('');
//         setImage(null);
//     };

//     return (
//         <View style={styles.container}>
//             <StatusBar backgroundColor="rgba(0,0,0,0.8)" barStyle="light-content" />

//             <TouchableOpacity onPress={pickImage}>
//                 {image ? (
//                     <Image source={{ uri: image }} style={styles.profileImage} />
//                 ) : (
//                     <View style={styles.profileImagePlaceholder}>
//                         <Text style={styles.placeholderText}>Profil Fotoğrafı</Text>
//                     </View>
//                 )}
//             </TouchableOpacity>

//             <Text style={styles.inputLabel}>İsim</Text>
//             <TextInput
//                 style={styles.input}
//                 value={name}
//                 onChangeText={setName}
//                 placeholder="İsminizi girin"
//             />

//             <Text style={styles.inputLabel}>E-posta</Text>
//             <TextInput
//                 style={styles.input}
//                 value={email}
//                 onChangeText={setEmail}
//                 placeholder="E-postanızı girin"
//                 keyboardType="email-address"
//             />

//             <Text style={styles.inputLabel}>Şifre</Text>
//             <TextInput
//                 style={styles.input}
//                 value={password}
//                 onChangeText={setPassword}
//                 placeholder="Şifrenizi girin"
//                 secureTextEntry
//             />

//             <Text style={styles.inputLabel}>Doğum Günü</Text>
//             <TextInput
//                 style={styles.input}
//                 value={dob}
//                 onChangeText={setDob}
//                 placeholder="Doğum tarihinizi girin"
//             />

//             <Text style={styles.inputLabel}>Ülke</Text>
//             <TextInput
//                 style={styles.input}
//                 value={country}
//                 onChangeText={setCountry}
//                 placeholder="Ülkenizi girin"
//             />

//             <Button title="Kaydet" onPress={handleSubmit} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         padding: 20,
//         backgroundColor: '#f8f8f8',
//     },
//     profileImage: {
//         width: 150,
//         height: 150,
//         borderRadius: 75, // Daire şekli
//         borderWidth: 2,
//         borderColor: '#ccc',
//         marginBottom: 20,
//     },
//     profileImagePlaceholder: {
//         width: 150,
//         height: 150,
//         borderRadius: 75, // Daire şekli
//         borderWidth: 2,
//         borderColor: '#ccc',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#e0e0e0',
//         marginBottom: 20,
//     },
//     placeholderText: {
//         color: '#aaa',
//         fontSize: 16,
//     },
//     inputLabel: {
//         fontSize: 16,
//         marginVertical: 10,
//     },
//     input: {
//         width: '100%',
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 5,
//         marginBottom: 15,
//     },
// });

// export default ProfileEditPage;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const EditProfileScreen = () => {
    const [profileImage, setProfileImage] = useState({ uri: 'https://via.placeholder.com/150' });
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [country, setCountry] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const navigation = useNavigation();

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

    const saveProfile = () => {
        const profileData = {
            name,
            email,
            password,
            birthDate,
            country,
            profileImage,
        };

        console.log('Kaydedilen Profil:', profileData);

        navigation.navigate('Hesabim', { profileData });
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
                />

                <Text style={styles.label}>Şifre</Text>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
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

                <Text style={styles.label}>Ülke</Text>
                <TextInput
                    style={styles.input}
                    value={country}
                    onChangeText={setCountry}
                />
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


