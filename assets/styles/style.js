    import { text } from '@fortawesome/fontawesome-svg-core';
    import { StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            padding: 30,
            alignItems: 'center',
            backgroundColor: 'rgb(243 239 239)',
        },
        backgroundImage: {
            flex: 1,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        label: {
            fontSize: 18,
            marginBottom: 10,
            color: '#333',
            fontWeight: '600',
            width: '100%',
        },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 12,
            padding: 12,
            marginBottom: 20,
            backgroundColor: '#fff',
            fontSize: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 2,
            width: '100%',
        },
        button: {
            backgroundColor: '#4e9c2e',
            paddingVertical: 15,
            borderRadius: 12,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 4,
            width: '100%',
            marginBottom: 20,
        },
        buttonText: {
            color: '#fff',
            fontSize: 20,
            fontWeight: '700',
        },
        forwardText: {
            color: '#4e9c2e',
            fontSize: 16,
            fontWeight: '500',
        },
        scrollViewContainer: {
            flex: 1,
            backgroundColor: 'rgb(243 239 239)',
          },
          welcomeContainer: {
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: 'rgb(243 239 239)',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 4,
            borderBottomEndRadius: 30,
            borderBottomStartRadius: 30,
            marginBottom: 10,
          },
          welcomeText: {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 5,
          },
          nameText: {
            fontSize: 20,
            color: '#555',
          },
          cardContainer: {
            paddingTop: 10,
            paddingHorizontal: 10,
            alignItems: 'center',
          },
          card: {
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 5,
            marginBottom: 15,
            width: '100%', // Ekranın %95'i genişliğinde
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
            alignItems: 'center',
          },
          cardImage: {
            width: '100%',
            height: 150,
            borderRadius: 10,
            marginBottom: 10,
          },
          cardTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
            marginBottom: 5,
            width: '100%',
          },
          cardDescription: {
            fontSize: 14,
            color: '#666',
            width: '100%',
          },
    });

    export default styles;

