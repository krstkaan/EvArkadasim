import styles from '../../assets/styles/style';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAccountPage = ({ navigation }) => {
  const dispatch = useDispatch();

  // Kullanıcı çıkış fonksiyonu
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Çıkış yapıldı');

      // Redux'tan çıkış
      dispatch(logout());

      // Ana sayfaya yönlendir
      navigation.navigate('HomePage');
    } catch (error) {
      console.error('Çıkış sırasında bir hata oluştu:', error);
    }
  };
  const handleEditProfile = () => {
    navigation.navigate('ProfileEditPage');
  };

  const handleSettings = () => {
    navigation.navigate('SettingsPage');
  };

  const handleMyAds = () => {
    navigation.navigate('MyAdsPage');
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>

        <Pressable
          style={styles.accountmenu}
          onPress={handleEditProfile}
          android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
        >
          <Ionicons name="person" size={24} color="black" />
          <Text style={styles.accountmenutext}>Profil Düzenle</Text>
          <Ionicons name="chevron-forward" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </Pressable>


        <Pressable
          style={styles.accountmenu}
          onPress={handleSettings}
          android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
        >
          <Ionicons name="settings" size={24} color="black" />
          <Text style={styles.accountmenutext}>Ayarlar</Text>
          <Ionicons name="chevron-forward" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </Pressable>



        <Pressable
          style={styles.accountmenu}
          onPress={handleMyAds}
          android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
        >
          <Ionicons name="list" size={24} color="black" />
          <Text style={styles.accountmenutext}>İlanlarım</Text>
          <Ionicons name="chevron-forward" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </Pressable>

        <Pressable
          style={styles.accountmenu}
          onPress={handleLogout}
          android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
        >
          <Ionicons name="log-out" size={24} color="black" />
          <Text style={styles.accountmenutext}>Çıkış yap</Text>
          <Ionicons name="chevron-forward" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </Pressable>

      </View>
    </View>
  );
};

export default MyAccountPage;
