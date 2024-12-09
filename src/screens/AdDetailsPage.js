import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const AdDetailsPage = ({ route }) => {
  const { id } = route.params; // Tıklanan ilanın ID'si
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(
          'https://roomiefies.com/app/getilandetails.php',
          new URLSearchParams({ id }) // URL encoded form olarak gönderim
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
      {data.imageurl1 && (
        <Image
          source={{ uri: `https://roomiefies.com/app/${data.imageurl1}` }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{data.title || 'Başlık Yok'}</Text>
      <Text style={styles.description}>{data.description || 'Açıklama Yok'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: 200, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  description: { fontSize: 14, color: '#555' },
});

export default AdDetailsPage;
