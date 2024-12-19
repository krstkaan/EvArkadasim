import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OnboardingScreen3 = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Karakter Testine Başla!</Text>
            <Text style={styles.description}>Ev arkadaşı adaylarını daha iyi anlayabilmek için karakter testi oluşturduk. Testi tamamlayarak sana en uygun eşleşmeleri bulmamıza yardımcı olabilirsin.</Text>
             <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.nextButton, { left:30, right:'auto' }]}
                onPress={() => navigation.goBack()}
            >
               <Ionicons name="arrow-back-circle-outline" size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('LoginPage')}
            >
                <Ionicons name="arrow-forward-circle-outline" size={40} color="white" />
            </TouchableOpacity>
                </View>
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
        marginBottom: 20,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 30,
        right:0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nextButton: {
        backgroundColor: '#6666ff',
        padding: 10,
        borderRadius: 50,
        marginLeft: 50,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',

    },
});

export default OnboardingScreen3;