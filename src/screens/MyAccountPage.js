import styles from '../../assets/styles/style';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAccountPage = ({ navigation }) => {
  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    country: '',
    birthDate: '',
    profileImage: 'https://via.placeholder.com/150', // Default profil resmi
  });

  // AsyncStorage'dan profil verilerini çekme
  const fetchProfile = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      console.error('Profil verisi yüklenirken hata oluştu:', error);
    }
  };

  // Çıkış fonksiyonu
  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log('Çıkış yapıldı');

      dispatch(logout());
      navigation.navigate('HomePage');
    } catch (error) {
      console.error('Çıkış sırasında bir hata oluştu:', error);
    }
  };

  // Profil bilgilerini her sayfa açıldığında yükle
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchProfile);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      {/* Profil Bilgileri */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image
          source={{ uri: profile.profileImage }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 10 }}
        />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {profile.name || 'Kullanıcı Adı'}
        </Text>
        <Text style={{ color: 'gray' }}>{profile.email || 'E-posta Adresi'}</Text>
      </View>

      {/* Menü */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <Pressable
          style={styles.accountmenu}
          onPress={() => navigation.navigate('ProfileEditPage')}
          android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
        >
          <Ionicons name="person" size={24} color="black" />
          <Text style={styles.accountmenutext}>Profil Düzenle</Text>
          <Ionicons name="chevron-forward" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </Pressable>

        <Pressable
          style={styles.accountmenu}
          onPress={() => navigation.navigate('MyAdsPage')}
          android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
        >
          <Ionicons name="list" size={24} color="black" />
          <Text style={styles.accountmenutext}>İlanlarım</Text>
          <Ionicons name="chevron-forward" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </Pressable>

        {/* Settings Menüsü */}
        <Pressable
          style={styles.accountmenu}
          onPress={() => navigation.navigate('SettingsPage')}
          android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
        >
          <Ionicons name="settings" size={24} color="black" />
          <Text style={styles.accountmenutext}>Ayarlar</Text>
          <Ionicons name="chevron-forward" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </Pressable>

        <Pressable
          style={styles.accountmenu}
          onPress={handleLogout}
          android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
        >
          <Ionicons name="log-out" size={24} color="black" />
          <Text style={styles.accountmenutext}>Çıkış Yap</Text>
          <Ionicons name="chevron-forward" size={24} color="black" style={{ marginLeft: 'auto' }} />
        </Pressable>
      </View>
    </View>
  );
};

export default MyAccountPage;
