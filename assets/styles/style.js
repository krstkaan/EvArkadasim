import { text } from '@fortawesome/fontawesome-svg-core';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    alignItems: 'center',
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
});

export default styles;
