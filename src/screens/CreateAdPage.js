import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import styles from '../../assets/styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';



const CreateAdPage = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [rent, setRent] = useState('');
  const [size, setSize] = useState('');
  const [binayasi, setBinaYasi] = useState('');
  const [cinsiyet, setCinsiyet] = useState('');
  const [esya, setEsya] = useState('');
  const [dairetipi, setDaireTipi] = useState('');
  const [isitmaturu, setIsitmaTuru] = useState('');
  const [yasaraligi, setYasAraligi] = useState('');
  const [genderOptions, setGenderOptions] = useState([]);
  const [DaireOptions, setDaireOptions] = useState([]);
  const [EsyaOptions, setEsyaOptions] = useState([]);
  const [IsitmaOptions, setIsitmaOptions] = useState([]);
  const [ArkadasYasOptions, setArkadasYasOptions] = useState([]);
  const [BinaYasOptions, setBinaYasOptions] = useState([]);
  const [ilOptions, setIlOptions] = useState([]);
  const [selectedIl, setSelectedIl] = useState('');
  const [ilceOptions, setIlceOptions] = useState([]); // İlçeler için state
  const [selectedIlce, setSelectedIlce] = useState(''); // Seçilen İlçe
  const [mahalleOptions, setMahalleOptions] = useState([]); // Mahalle için state
  const [selectedMahalle, setSelectedMahalle] = useState(''); // Seçilen Mahalle
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genderRes, daireRes, esyaRes, isitmaRes, yasRes, binayasRes, ilRes] = await Promise.all([
          axios.get('https://roomiefies.com/app/ilangender.php'),
          axios.get('https://roomiefies.com/app/ilandairetip.php'),
          axios.get('https://roomiefies.com/app/ilanesya.php'),
          axios.get('https://roomiefies.com/app/ilanisitma.php'),
          axios.get('https://roomiefies.com/app/ilanarkadasyas.php'),
          axios.get('https://roomiefies.com/app/ilanbinayas.php'),
          axios.get('https://roomiefies.com/app/getsehir.php'),
        ]);
        setIlOptions(ilRes.data);
        setBinaYasOptions(binayasRes.data);
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

  const [userID, setUserID] = useState(''); // Kullanıcı adını saklamak için state

  useEffect(() => {
    const fetchuserID = async () => {
      try {
        const userID = await AsyncStorage.getItem('userID');
        if (userID) {
          setUserID(userID); // Kullanıcı adını state'e aktar
          console.log('Kullanıcı ID:', userID);
        }
        else {
          console.log('Kullanıcı ID alınamadı.');
        }
      } catch (error) {
        console.log('Error fetching userID:', error);
      }
    };

    fetchuserID();
  }, []);


  // Şehir seçildiğinde ilçeleri API'den çekme
  useEffect(() => {
    const fetchIlce = async () => {
      if (selectedIl) {
        try {
          const response = await axios.get('https://roomiefies.com/app/getmahalle.php', {
            params: { UstID: selectedIl },
          });
          setIlceOptions(response.data);
          setSelectedIlce(''); // İl değiştiğinde ilçe sıfırlanır
          setMahalleOptions([]); // İl değiştiğinde mahalle sıfırlanır
          setSelectedMahalle('');
        } catch (err) {
          console.error('İlçe verileri alınırken bir hata oluştu:', err.response?.data || err.message);
          setIlceOptions([]);
        }
      }
    };

    fetchIlce();
  }, [selectedIl]);

  // İlçe seçildiğinde mahalleleri API'den çekme
  useEffect(() => {
    const fetchMahalle = async () => {
      if (selectedIlce) {
        try {
          const response = await axios.get('https://roomiefies.com/app/getmahalle.php', {
            params: { UstID: selectedIlce },
          });
          setMahalleOptions(response.data);
          setSelectedMahalle(''); // İlçe değiştiğinde mahalle sıfırlanır
        } catch (err) {
          console.error('Mahalle verileri alınırken bir hata oluştu:', err.response?.data || err.message);
          setMahalleOptions([]);
        }
      }
    };

    fetchMahalle();
  }, [selectedIlce]);



  const handleSubmit = () => {
    if (!title || !description || !rent || !selectedIl || !selectedIlce || !selectedMahalle || !cinsiyet || !yasaraligi || !dairetipi || !esya || !isitmaturu || !binayasi) {
      alert('Lütfen tüm alanları doldurunuz.');
      console.log('Form gönderilemedi. Eksik alanlar var.');
      console.log({
        title,
        description,
        rent,
        size,
        cinsiyet,
        yasaraligi,
        dairetipi,
        esya,
        isitmaturu,
        binayasi,
        selectedIl,
        selectedIlce,
        selectedMahalle,
      });
      return;
    }

    // Form verilerini logla
    console.log('Form gönderildi!', {
      title,
      description,
      rent,
      size,
      cinsiyet,
      yasaraligi,
      dairetipi,
      esya,
      isitmaturu,
      binayasi,
      selectedIl,
      selectedIlce,
      selectedMahalle,
      userID,
    });

    // Form verilerini gönder
    fetch('https://roomiefies.com/app/ilansave.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        rent,
        size,
        cinsiyet,
        yasaraligi,
        dairetipi,
        esya,
        isitmaturu,
        binayasi,
        selectedIl,
        selectedIlce,
        selectedMahalle,
        userID,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          if (data.sonuc === 1) {
            alert('İlan başarıyla kaydedildi!');
            console.log('Başarılı:', data);
            navigation.navigate('HomePage'); // HomePage'e yönlendirme

          } else {
            alert('İlan kaydedilirken bir hata oluştu.');
            console.log('Hata:', data);
          }

        }

      })
      .catch(error => {
        alert('Sunucuya bağlanırken bir hata oluştu.');
        console.error('Hata:', error);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainerStyle}>
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
      <Text style={styles.label}>Kira Bedeli</Text>
      <TextInput
        style={styles.input}
        placeholder="Evin Kirası"
        value={rent}
        onChangeText={setRent}
        keyboardType="numeric"
      />
      <Text style={styles.label}>Ev m²</Text>
      <TextInput
        style={styles.input}
        placeholder="Evin m²"
        value={size}
        onChangeText={setSize}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Tercih Edilen Ev Arkadaşı Cinsiyeti</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={cinsiyet}
          onValueChange={(itemValue) => {
            setCinsiyet(itemValue);
            console.log('Seçilen Cinsiyet ID:', itemValue);
          }}
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
          onValueChange={(itemValue) => {
            setYasAraligi(itemValue);
            console.log('Seçilen Yaş Aralığı ID:', itemValue);
          }}
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
          onValueChange={(itemValue) => {
            setDaireTipi(itemValue);
            console.log('Seçilen Daire Tipi ID:', itemValue);
          }}
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
          onValueChange={(itemValue) => {
            setEsya(itemValue);
            console.log('Seçilen Eşya Durumu ID:', itemValue);
          }}
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
          onValueChange={(itemValue) => {
            setIsitmaTuru(itemValue);
            console.log('Seçilen Isıtma Türü ID:', itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {IsitmaOptions.map((isitmaturu) => (
            <Picker.Item key={isitmaturu.id} label={isitmaturu.tip_adi} value={isitmaturu.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Bina Yaşı</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={binayasi}
          onValueChange={(itemValue) => {
            setBinaYasi(itemValue);
            console.log('Seçilen Bina Yaşı ID:', itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {BinaYasOptions.map((binayasi) => (
            <Picker.Item key={binayasi.id} label={binayasi.binayas} value={binayasi.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Şehir</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedIl}
          onValueChange={(itemValue) => {
            setSelectedIl(itemValue);
            console.log('Seçilen İl ID:', itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {ilOptions.map((il) => (
            <Picker.Item key={il.id} label={il.SehirIlceMahalleAdi} value={il.id} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>İlçe</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedIlce}
          onValueChange={(itemValue) => {
            setSelectedIlce(itemValue);
            console.log('Seçilen İlçe ID:', itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {ilceOptions.map((ilce) => (
            <Picker.Item key={ilce.id} label={ilce.SehirIlceMahalleAdi} value={ilce.id} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>Mahalle</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMahalle}
          onValueChange={(itemValue) => {
            setSelectedMahalle(itemValue);
            console.log('Seçilen Mahalle ID:', itemValue);
          }}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          {mahalleOptions.map((mahalle) => (
            <Picker.Item key={mahalle.id} label={mahalle.SehirIlceMahalleAdi} value={mahalle.id} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
        <Text style={styles.buttonText}>İlan Ver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateAdPage;
