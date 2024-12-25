// import React from 'react';
// import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const SettingsPage = ({ navigation }) => {
//     return (
//         <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
//             {/* Account Section */}
//             <Text style={styles.sectionTitle}>Hesap</Text>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('EditProfile')}>
//                 <Ionicons name="person" size={24} color="black" />
//                 <Text style={styles.menuText}>Profili Düzenle</Text>
//             </Pressable>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Security')}>
//                 <Ionicons name="shield-checkmark" size={24} color="black" />
//                 <Text style={styles.menuText}>Güvenlik</Text>
//             </Pressable>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Notifications')}>
//                 <Ionicons name="notifications" size={24} color="black" />
//                 <Text style={styles.menuText}>Bildirimler</Text>
//             </Pressable>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Privacy')}>
//                 <Ionicons name="lock-closed" size={24} color="black" />
//                 <Text style={styles.menuText}>Gizlilik</Text>
//             </Pressable>

//             {/* Support & About Section */}
//             <Text style={styles.sectionTitle}>Destek & Hakkında</Text>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('MySubscription')}>
//                 <Ionicons name="card" size={24} color="black" />
//                 <Text style={styles.menuText}>Aboneliğim</Text>
//             </Pressable>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('HelpSupport')}>
//                 <Ionicons name="help-circle" size={24} color="black" />
//                 <Text style={styles.menuText}>Yardım & Destek</Text>
//             </Pressable>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('TermsPolicies')}>
//                 <Ionicons name="document-text" size={24} color="black" />
//                 <Text style={styles.menuText}>Şartlar ve Politikalar</Text>
//             </Pressable>

//             {/* Cache & Cellular Section */}
//             <Text style={styles.sectionTitle}>Önbellek & Hücresel</Text>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('FreeUpSpace')}>
//                 <Ionicons name="trash-bin" size={24} color="black" />
//                 <Text style={styles.menuText}>Alan Boşalt</Text>
//             </Pressable>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('DateSaver')}>
//                 <Ionicons name="battery-charging" size={24} color="black" />
//                 <Text style={styles.menuText}>Veri Tasarrufu</Text>
//             </Pressable>

//             {/* Actions Section */}
//             <Text style={styles.sectionTitle}>Eylemler</Text>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('ReportProblem')}>
//                 <Ionicons name="chatbubbles" size={24} color="black" />
//                 <Text style={styles.menuText}>Sorun Bildir</Text>
//             </Pressable>
//             <Pressable style={styles.menuItem} onPress={() => navigation.navigate('Logout')}>
//                 <Ionicons name="log-out" size={24} color="black" />
//                 <Text style={styles.menuText}>Çıkış Yap</Text>
//             </Pressable>
//         </ScrollView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: '600',
//         marginVertical: 10,
//         marginTop: 5,
//         marginBottom: 10,
//         color: '#333',
//     },
//     menuItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingVertical: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//         marginTop: 10,
//     },
//     menuText: {
//         marginLeft: 10,
//         fontSize: 16,
//     },
// });

// export default SettingsPage;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, MaterialIcons, FontAwesome } from 'react-native-vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';

const SettingsPage = ({ navigation }) => {
    const [darkMode, setDarkMode] = useState(false);
    const dispatch = useDispatch();

    // Çıkış fonksiyonu
    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            console.log('Çıkış yapıldı');
            dispatch(logout()); // Redux logout işlemi
            navigation.navigate('HomePage'); // Ana sayfaya yönlendirme
        } catch (error) {
            console.error('Çıkış sırasında bir hata oluştu:', error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            {/* Hesap Ayarları */}
            <TouchableOpacity style={styles.section}>
                <Ionicons name="person" size={24} color={styles.iconColor.color} />
                <Text style={styles.sectionText}>Hesap</Text>
            </TouchableOpacity>

            {/* Bildirimler */}
            <TouchableOpacity style={styles.section}>
                <MaterialIcons name="notifications" size={24} color={styles.iconColor.color} />
                <Text style={styles.sectionText}>Bildirimler</Text>
            </TouchableOpacity>

            {/* Gizlilik Ayarları */}
            <TouchableOpacity style={styles.section}>
                <Ionicons name="shield" size={24} color={styles.iconColor.color} />
                <Text style={styles.sectionText}>Gizlilik</Text>
            </TouchableOpacity>

            {/* Sohbetler */}
            <TouchableOpacity style={styles.section}>
                <FontAwesome name="comments" size={24} color={styles.iconColor.color} />
                <Text style={styles.sectionText}>Sohbetler</Text>
            </TouchableOpacity>

            {/* Abonelik ve Ödeme */}
            <TouchableOpacity style={styles.section}>
                <MaterialIcons name="payment" size={24} color={styles.iconColor.color} />
                <Text style={styles.sectionText}>Abonelik ve Ödeme</Text>
            </TouchableOpacity>

            {/* Dil ve Bölge */}
            <TouchableOpacity style={styles.section}>
                <Ionicons name="language" size={24} color={styles.iconColor.color} />
                <Text style={styles.sectionText}>Dil ve Bölge</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.section}>
                <Ionicons name="moon" size={24} color={styles.iconColor.color} />
                <Text style={styles.sectionText}>Tema Ayarları</Text>
            </TouchableOpacity>

            {/* Yardım */}
            <TouchableOpacity style={styles.section}>
                <Ionicons name="help-circle" size={24} color={styles.iconColor.color} />
                <Text style={styles.sectionText}>Yardım</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    sectionText: {
        fontSize: 18,
        color: 'black',
        marginLeft: 10,
        textAlign: 'left',
    },
    iconColor: {
        color: 'black',
    },
});

export default SettingsPage;
