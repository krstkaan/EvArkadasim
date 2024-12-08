import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../../assets/styles/style';

const HomePage = () => {
  const [displayName, setDisplayName] = useState(''); // Kullanıcı adını saklamak için state
  const [data, setData] = useState([]); // İlan verilerini saklamak için state

  useEffect(() => {
    // Kullanıcı adını AsyncStorage'dan al
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

    // İlanları API'den al
    const fetchData = async () => {
      try {
        const response = await axios.get('https://roomiefies.com/app/getilan.php');
        console.log('API Response:', response.data); // Yanıtı kontrol edin
        if (Array.isArray(response.data)) {
          // Her öğeye tam URL'yi ekle
          const formattedData = response.data.map((item) => ({
            ...item,
            imageurl1: `https://roomiefies.com/app/${item.imageurl1}`
          }));
          setData(formattedData);
        } else {
          console.error('API yanıtı bir array değil:', response.data);
          setData([]); // Hatalı yanıt durumunda boş bir array ayarla
        }
      } catch (error) {
        console.error('Error fetching ilanlar:', error);
      }
    };


    fetchDisplayName();
    fetchData();
  }, []); // Sadece bir kez çalıştırmak için boş bağımlılık array'i

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.nameText}>Back, {displayName}👋</Text>
      </View>
      <View style={styles.cardContainer}>
        {data.length > 0 ? (
          data.map((item) => (
            <TouchableOpacity key={item.id} style={styles.card}>
              <Image source={{ uri: item.imageurl1 }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>
                {item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title}
              </Text>
              <View style={styles.rowContainerHomeCard}>
                <Text style={styles.cardDescription}>{item.rent} TL</Text>
                <Text style={styles.cardDescriptionRight}>{item.displayName}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noDataText}>No data available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default HomePage;
