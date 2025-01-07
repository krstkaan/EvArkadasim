import styles from '../../assets/styles/style';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/UserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAccountPage = ({ navigation }) => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    const fetchDisplayName = async () => {
      try {
        const name = await AsyncStorage.getItem('displayname');
        if (name) {
          setDisplayName(name);
        }
      } catch (error) {
        console.log('Error fetching display name:', error);
      }
    };

    fetchDisplayName();
  }, []);


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

  return (
    <View style={styles.container}>
      {/* Profil bilgileri */}
      <View style={styles.profileHeader}>
        <Text style={styles.profileName}>{displayName}</Text>
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
        <Pressable
          style={styles.accountmenu}
          onPress={() => navigation.navigate('MyFavAdsPage')}
          android_ripple={{ color: 'rgba(0,0,0,0.2)' }}
        >
          <Ionicons name="heart" size={24} color="black" />
          <Text style={styles.accountmenutext}>Favorilerim</Text>
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