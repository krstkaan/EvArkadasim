import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import styles from '../../assets/styles/style';

const HomePage = () => {
  const [displayName, setDisplayName] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 4;

  const navigation = useNavigation();

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

  const fetchData = async (newOffset = 0) => {
    try {
      const response = await axios.get(
        `https://roomiefies.com/app/getilan.php?offset=${newOffset}&limit=${limit}`
      );
      console.log('Response:', response.data);
      if (Array.isArray(response.data)) {
        const formattedData = response.data.map((item) => ({
          ...item,
          imageurl1: `https://roomiefies.com/app/${item.imageurl1}`,
        }));
        setData((prevData) => (newOffset === 0 ? formattedData : [...prevData, ...formattedData]));
      }
    } catch (error) {
      console.error('Error fetching ilanlar:', error);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchDisplayName();
    fetchData();
  }, []);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;

    if (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20 &&
      !isLoadingMore
    ) {
      setIsLoadingMore(true);
      setOffset((prevOffset) => {
        const newOffset = prevOffset + limit;
        fetchData(newOffset);
        return newOffset;
      });
    }
  };

  const handleCardPress = (id) => {
    navigation.navigate('AdDetailsPage', { id }); // `AdDetailsPage` sayfasına yönlendir
  };

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      onScroll={handleScroll}
      scrollEventThrottle={16}
    >
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Hoşgeldin</Text>
        <Text style={styles.nameText}>{displayName}👋</Text>
      </View>
      <View style={styles.cardContainer}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <View key={index} style={[styles.card, styles.placeholderCard]}>
              <ActivityIndicator size="small" color="#ccc" style={styles.loadingIndicator} />
              <Text style={styles.placeholderText}>Yükleniyor...</Text>
            </View>
          ))
        ) : data.length > 0 ? (
          data.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => handleCardPress(item.id)}
            >
              <Image source={{ uri: item.imageurl1 }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>
                {item.title.length > 25 ? item.title.substring(0, 25) + '...' : item.title}
              </Text>
              <View style={styles.rowContainerHomeCard}>
                <Text style={styles.cardDescription}>{item.rent ? `${Number(item.rent).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}` : 'Belirtilmemiş'}</Text>
                <Text style={styles.cardDescriptionRight}>{item.displayName}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noDataText}>Veri bulunamadı</Text>
        )}
        {isLoadingMore && (
          <ActivityIndicator size="small" color="#ccc" style={{ marginVertical: 10 }} />
        )}
      </View>
    </ScrollView>
  );
};

export default HomePage;
