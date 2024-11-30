import React, { useState, } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';

const CreateAdPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [roomCount, setRoomCount] = useState('');
  const [rent, setRent] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [location, setLocation] = useState('');
  const [buildingAge, setBuildingAge] = useState('');
  const [cinsiyet, setCinsiyet] = useState('');
  const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [internet, setInternet] = useState(false);
  const [schoolsituation, setSchoolSituation] = useState('');
  const [guestAllowed, setGuestAllowed] = useState('');
  const [images, setImages] = useState([]);
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');



  const selectImages = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (response.assets) {
        setImages(response.assets.map(asset => asset.uri));
      }
    });
  };




  const handleSubmit = () => {
    console.log({
      title,
      description,
      roomCount,
      rent,
      numPeople,
      location,
      buildingAge,
      amenities: { internet, washingMachine },
      cleaningFrequency,
      guestAllowed,
      budget: { minBudget, maxBudget },
      images
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}></Text>
      </View>

      <Text style={styles.label}>Başlık</Text>
      <TextInput
        style={styles.input}
        placeholder="İlan Başlığı"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Açıklama</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="İlan Açıklaması"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Cinsiyet</Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={() => setCinsiyet('Erkek')}>
          <Text style={[styles.checkbox, cinsiyet === 'Erkek' && styles.selected]}>
            {cinsiyet === 'Erkek' ? '☑' : '☐'} Erkek
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCinsiyet('Kadın')}>
          <Text style={[styles.checkbox, cinsiyet === 'Kadın' && styles.selected]}>
            {cinsiyet === 'Kadın' ? '☑' : '☐'} Kadın
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setCinsiyet('Diğer')}>
          <Text style={[styles.checkbox, cinsiyet === 'Diğer' && styles.selected]}>
            {cinsiyet === 'Diğer' ? '☑' : '☐'} Diğer
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Yaş Aralığı</Text>

      <Picker
        selectedValue={selectedAgeRange}
        onValueChange={(itemValue) => setSelectedAgeRange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="18-25" value="18-25" />
        <Picker.Item label="25-35" value="25-35" />
        <Picker.Item label="35+" value="35+" />
      </Picker>

      {selectedAgeRange && (
        <Text style={styles.selectedText}></Text>
      )}

      <Text style={styles.label}>Okul/İş</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={schoolsituation}
        onChangeText={setSchoolSituation}
      />

      <Text style={styles.label}>Daire Tipi</Text>

      <Picker
        selectedValue={selectedPropertyType}
        onValueChange={(itemValue) => setSelectedPropertyType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="1+1" value="1+1" />
        <Picker.Item label="2+1" value="2+1" />
        <Picker.Item label="3+1" value="3+1" />
        <Picker.Item label="Stüdyo" value="Stüdyo" />
        <Picker.Item label="5+" value="5+" />
      </Picker>

      {selectedPropertyType && (
        <Text style={styles.selectedText}></Text>
      )}

      <Text style={styles.label}>Kira Bedeli</Text>
      <TextInput
        style={styles.input}
        placeholder="Evin Kirası"
        value={rent}
        onChangeText={setRent}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Konum</Text>
      <TextInput
        style={styles.input}
        placeholder="Ev Konumu"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Bina Yaşı</Text>
      <TextInput
        style={styles.input}
        placeholder="Kaç Yıllık Bina"
        value={buildingAge}
        onChangeText={setBuildingAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Misafir Kabul Durumu</Text>
      <Picker
        selectedValue={guestAllowed}
        onValueChange={(itemValue) => setGuestAllowed(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Kabul Ediliyor" value="yes" />
        <Picker.Item label="Kabul Edilmiyor" value="no" />
      </Picker>

      <Text style={styles.label}>Bütçe Aralığı</Text>
      <View style={styles.budgetContainer}>
        <TextInput
          style={[styles.input, { flex: 1, marginRight: 5 }]}
          placeholder="Minimum"
          value={minBudget}
          onChangeText={setMinBudget}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, { flex: 1, marginLeft: 5 }]}
          placeholder="Maksimum"
          value={maxBudget}
          onChangeText={setMaxBudget}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.label}>Fotoğraf Yükle</Text>
      <TouchableOpacity onPress={selectImages} style={styles.button}>
        <Text style={styles.buttonText}>Fotoğraf Seç</Text>
      </TouchableOpacity>
      <Text>Seçilen Fotoğraflar: {images.length}</Text>

      <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
        <Text style={styles.buttonText}>İlan Ver</Text>
      </TouchableOpacity>
    </ScrollView >
  );
};

export default CreateAdPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  headerContainer: {
    paddingVertical: 15,
    borderRadius: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
    width: '100%',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  checkbox: {
    fontSize: 16,
    marginRight: 20,
  },
  budgetContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#28a745',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});