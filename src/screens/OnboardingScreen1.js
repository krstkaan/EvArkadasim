import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Expo icons kütüphanesi

const OnboardingScreen1 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Hoş Geldin!</Text>
            <Text style={styles.description}>Roomifies'e adım attığın için çok heyecanlıyız! Ev arkadaşı arayışında sana en iyi deneyimi sunmak için buradayız.</Text>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('OnboardingScreen2')}
            >
                <Ionicons name="arrow-forward-circle-outline" size={40} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        color: '#555',
        marginBottom: 40,
    },
        nextButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#6666ff',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',

    },
});

export default OnboardingScreen1;