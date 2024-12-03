import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, useEffect } from 'react-native';
import React from 'react';
import styles from '../../assets/styles/style';
import CustomUserBottomBar from '../components/component/CustomUserBottomBar';

const HomePage = () => {
  const data = [
    { id: '1', image: 'https://via.placeholder.com/150', title: 'Card 1', description: 'Description for Card 1' },
    { id: '2', image: 'https://via.placeholder.com/150', title: 'Card 2', description: 'Description for Card 2' },
    { id: '3', image: 'https://via.placeholder.com/150', title: 'Card 3', description: 'Description for Card 3' },
  ];

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome</Text>
        <Text style={styles.nameText}>Back, UserName👋</Text>
      </View>
      <View style={styles.cardContainer}>
        {data.map((item) => (
          <TouchableOpacity key={item.id} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomePage;
