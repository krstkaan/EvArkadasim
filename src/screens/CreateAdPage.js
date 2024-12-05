import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import styles from '../../assets/styles/style';

const CreateAdPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rent, setRent] = useState('');
  const [location, setLocation] = useState('');
  const [buildingAge, setBuildingAge] = useState('');
  const [cinsiyet, setCinsiyet] = useState('');
  const [esya, setEsya] = useState('');
  const [dairetipi, setDaireTipi] = useState('');
  const [isitmaturu, setIsitmaTuru] = useState('');
  const [yasaraligi, setYasAraligi] = useState('');
  const [selectedIl, setSelectedIl] = useState('');
  const [selectedIlce, setSelectedIlce] = useState('');
  const [selectedMahalle, setSelectedMahalle] = useState('');
  const [genderOptions, setGenderOptions] = useState([]);
  const [DaireOptions, setDaireOptions] = useState([]);
  const [EsyaOptions, setEsyaOptions] = useState([]);
  const [IsitmaOptions, setIsitmaOptions] = useState([]);
  const [ArkadasYasOptions, setArkadasYasOptions] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genderRes, daireRes, esyaRes, isitmaRes, yasRes] = await Promise.all([
          axios.get('https://roomiefies.com/app/ilangender.php'),
          axios.get('https://roomiefies.com/app/ilandairetip.php'),
          axios.get('https://roomiefies.com/app/ilanesya.php'),
          axios.get('https://roomiefies.com/app/ilanisitma.php'),
          axios.get('https://roomiefies.com/app/ilanarkadasyas.php'),
        ]);
        setGenderOptions(genderRes.data);
        setDaireOptions(daireRes.data);
        setEsyaOptions(esyaRes.data);
        setIsitmaOptions(isitmaRes.data);
        setArkadasYasOptions(yasRes.data);
      } catch (err) {
        setError('Veriler alınırken bir hata oluştu.');
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const selectImages = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (response.assets) {
        setImages(response.assets.map(asset => asset.uri));
      }
    });
  };

  const handleSubmit = () => {
    if (!title || !description || !rent || !selectedIl || !selectedIlce || !selectedMahalle) {
      alert('Lütfen tüm gerekli alanları doldurun.');
      return;
    }
    console.log('Form gönderildi:', {
      title,
      description,
      rent,
      location,
      buildingAge,
      cinsiyet,
      esya,
      dairetipi,
      isitmaturu,
      yasaraligi,
      selectedIl,
      selectedIlce,
      selectedMahalle,
      images,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainerStyle}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>İlan Oluştur</Text>
      </View>

      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}

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

      <Text style={styles.label}>Tercih Edilen Ev Arkadaşı Cinsiyeti</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cinsiyet}
          onValueChange={(itemValue) => setCinsiyet(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {genderOptions.map((gender) => (
            <Picker.Item key={gender.id} label={gender.title} value={gender.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Tercih Edilen Ev Arkadaşı Yaş Aralığı</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={yasaraligi}
          onValueChange={(itemValue) => setYasAraligi(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {ArkadasYasOptions.map((yasaraligi) => (
            <Picker.Item key={yasaraligi.id} label={yasaraligi.aralik} value={yasaraligi.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Ev Tipi</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={dairetipi}
          onValueChange={(itemValue) => setDaireTipi(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {DaireOptions.map((daire) => (
            <Picker.Item key={daire.id} label={daire.tip_adi} value={daire.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Eşya Durumu</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={esya}
          onValueChange={(itemValue) => setEsya(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {EsyaOptions.map((esya) => (
            <Picker.Item key={esya.id} label={esya.durum_adi} value={esya.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Isıtma Durumu</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={isitmaturu}
          onValueChange={(itemValue) => setIsitmaTuru(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {IsitmaOptions.map((isitmaturu) => (
            <Picker.Item key={isitmaturu.id} label={isitmaturu.tip_adi} value={isitmaturu.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Kira Bedeli</Text>
      <TextInput
        style={styles.input}
        placeholder="Evin Kirası"
        value={rent}
        onChangeText={setRent}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Fotoğraf Yükle</Text>
      <TouchableOpacity onPress={selectImages} style={styles.button}>
        <Text style={styles.buttonText}>Fotoğraf Seç</Text>
      </TouchableOpacity>
      <ScrollView horizontal>
        {images.map((uri, index) => (
          <Image key={index} source={{ uri }} style={{ width: 100, height: 100, margin: 5 }} />
        ))}
      </ScrollView>
      <Text>Seçilen Fotoğraflar: {images.length}</Text>

      <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
        <Text style={styles.buttonText}>İlan Ver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateAdPage;
