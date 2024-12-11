import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

const { width, height } = Dimensions.get('window');
const IMAGE_HEIGHT = height * 0.5;

const AdDetailsPage = ({ route }) => {
  const { id } = route.params; // Tıklanan ilanın ID'si
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // Favori durumu

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(
          'https://roomiefies.com/app/getilandetails.php',
          new URLSearchParams({ id }) // URL encoded form gönderim
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching ilan details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Detaylar yüklenemedi</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Favori ve Paylaş butonları */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.roundButton} onPress={toggleFavorite}>
          <MaterialIcons
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={24}
            color="#4e9c2e"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundButton}>
          <FontAwesome name="share" size={24} color="#4e9c2e" />
        </TouchableOpacity>
      </View>
      {/* Ürün görseli */}
      <Image
        source={{ uri: `https://roomiefies.com/app/${data.imageurl1}` }}
        style={styles.image}
      />
      {/* Ürün detayları */}
      <ScrollView style={styles.detailsContainer}>
        <Text style={styles.title}>{data.title || 'Başlık Yok'}</Text>
        <Text style={styles.description}>{data.description || 'Açıklama Yok'}</Text>
        <Text style={styles.label}>Satıcı: {data.displayName || 'Bilinmiyor'}</Text>
        <Text style={styles.label}>
          Fiyat: {data.rent ? `${Number(data.rent).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}` : 'Belirtilmemiş'}
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginTop: 50,
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4e9c2e',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  actionButtons: {
    position: 'absolute',
    top: 120,
    right: 10,
    zIndex: 10,
    flexDirection: 'column',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default AdDetailsPage;
