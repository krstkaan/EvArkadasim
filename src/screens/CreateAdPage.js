import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Modal, Pressable, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import styles from '../../assets/styles/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import CustomButton from '../components/component/CustomButton';
import Loading from '../components/component/Loading';



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
  const [sending, setSending] = useState(false);
  const [selectedIl, setSelectedIl] = useState('');
  const [ilceOptions, setIlceOptions] = useState([]); // İlçeler için state
  const [selectedIlce, setSelectedIlce] = useState(''); // Seçilen İlçe
  const [mahalleOptions, setMahalleOptions] = useState([]); // Mahalle için state
  const [selectedMahalle, setSelectedMahalle] = useState(''); // Seçilen Mahalle
  const [resimmodalVisible, setResimmodalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Tam boy gösterilecek resim için state
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
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

  const pickimage = async ({ hangiimage }) => {
    try {
      Alert.alert(
        "Seçim Yapın",
        "Bir fotoğraf çekmek mi yoksa galeriden seçmek mi istersiniz?",
        [
          {
            text: "Galeri",
            onPress: async () => {
              try {
                let result = await ImagePicker.launchImageLibraryAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.Images,
                  allowsEditing: true,
                  aspect: [16, 9],
                  quality: 0.5,
                });
                await handleImageResult(result, hangiimage);
              } catch (error) {
                console.log("Galeri hatası:", error);
              }
            },
          },
          {
            text: "Kamera",
            onPress: async () => {
              try {
                let result = await ImagePicker.launchCameraAsync({
                  allowsEditing: true,
                  aspect: [16,9],
                  quality: 0.5,
                });
                await handleImageResult(result, hangiimage);
              } catch (error) {
                console.log("Kamera hatası:", error);
              }
            },
          },
          { text: "İptal", style: "cancel" },
        ]
      );
    } catch (error) {
      console.log("Ana hata:", error);
    }
  };

  const handleImageResult = async (result, hangiimage) => {
    try {
      if (!result.cancelled && result.assets && result.assets.length > 0) {
        const manipulatedImage = await ImageManipulator.manipulateAsync(
          result.assets[0].uri,
          [{ resize: { width: 500 } }],
          { compress: 0.5, format: ImageManipulator.SaveFormat.JPEG }
        );
        if (hangiimage === 1) {
          setImage1(manipulatedImage.uri);
        }
        if (hangiimage === 2) {
          setImage2(manipulatedImage.uri);
        }
        if (hangiimage === 3) {
          setImage3(manipulatedImage.uri);
        }
      }
    } catch (error) {
      console.log("Resim işleme hatası:", error);
    }
  };




  const Card = ({ title, imageUrl, handleOnpress, handleResimsil }) => {
    return (
      <View style={styles.cardIlan}>
        <Pressable onPress={() => showImageFullScreen(imageUrl)}>
          <Image source={{ uri: imageUrl }} style={styles.cardImageIlan} />
        </Pressable>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <CustomButton
            setWidth='40'
            handleOnpress={handleOnpress}
            ButtonColor='#4e9c2e'
            pressedButtonColor='#4e9c2e'
            ButtonBorderRadius={20}
            handleMarginBottom={0}
            handleIconname="camera"
            handleIconsize={24}
            handleIconColor='#fff'
          />
          <CustomButton
            setWidth='40'
            handleOnpress={handleResimsil}
            ButtonColor='#4e9c2e'
            pressedButtonColor='#4e9c2e'
            ButtonBorderRadius={20}
            handleMarginBottom={0}
            handleIconname="trash"
            handleIconsize={24}
            handleIconColor='#fff'
          />
        </View>
        <Text style={styles.cardTitleİlan}>{title}</Text>
      </View>
    );
  };

  const handleSubmit = () => {
    if (
      !title ||
      !description ||
      !rent ||
      !selectedIl ||
      !selectedIlce ||
      !selectedMahalle ||
      !cinsiyet ||
      !yasaraligi ||
      !dairetipi ||
      !esya ||
      !isitmaturu ||
      !binayasi ||
      !image1
    ) {
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
        image1,
      });
      return;
    }

    // Form verilerini gönder
    sendData();
  };


  // Form verilerini logla
  const sendData = async () => {


    setSending(true);

    try {

      let formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('rent', rent);
      formData.append('size', size);
      formData.append('cinsiyet', cinsiyet);
      formData.append('yasaraligi', yasaraligi);
      formData.append('dairetipi', dairetipi);
      formData.append('esya', esya);
      formData.append('isitmaturu', isitmaturu);
      formData.append('binayasi', binayasi);
      formData.append('selectedIl', selectedIl);
      formData.append('selectedIlce', selectedIlce);
      formData.append('selectedMahalle', selectedMahalle);
      formData.append('userID', userID);

      if (image1) {
        const image1Blob = await fetch(image1).then(res => res.blob());
        formData.append('image1', {
          uri: image1,
          name: 'image1.jpg',
          type: image1Blob.type,
        });
      }

      if (image2) {
        const image2Blob = await fetch(image2).then(res => res.blob());
        formData.append('image2', {
          uri: image2,
          name: 'image2.jpg',
          type: image2Blob.type,
        });
      }

      if (image3) {
        const image3Blob = await fetch(image3).then(res => res.blob());
        formData.append('image3', {
          uri: image3,
          name: 'image3.jpg',
          type: image3Blob.type,
        });
      }




      const response = await axios.post('https://roomiefies.com/app/ilansave.php', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(`Yükleme İlerlemesi: ${progress}%`);
        },
      });

      console.log('Gönderilen veri:', response.data);
      if (response.data.sonuc === 0) {
        Alert.alert('Hata', response.data.mesaj, [{ text: 'Tamam' }]);
        setSending(false);
      }

      if (response.data.sonuc === 1) {
        Alert.alert('Başarılı', 'İlan başarıyla kaydedildi!');
        setTitle('');
        setDescription('');
        setRent('');
        setSize('');
        setCinsiyet('');
        setYasAraligi('');
        setDaireTipi('');
        setEsya('');
        setIsitmaTuru('');
        setBinaYasi('');
        setSelectedIl('');
        setSelectedIlce('');
        setSelectedMahalle('');
        setSending(false);
        setImage1('');
        setImage2('');
        setImage3('');
        navigation.navigate('HomePage'); // HomePage'e yönlendirme
      } else {
        Alert.alert('Hata', 'İlan kaydedilirken bir hata oluştu.');
        setSending(false);
      }
    } catch (error) {
      Alert.alert('Hata', 'Sunucuya bağlanırken bir hata oluştu.');
      console.error('Gönderim hatası:', error);
      setSending(false);
    }
  };
  
  if (sending) {
    return <Loading IndicatorMetni='Onaya Gönderiliyor...' />;
  }



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainerStyle}>
      {error && <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>}
      <Modal
        visible={resimmodalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setResimmodalVisible(false)}
      >
        <StatusBar backgroundColor='rgba(0,0,0,0.8)' barStyle="light-content" />
        <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.8)', flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => setResimmodalVisible(false)}>
          <Image source={{ uri: selectedImage }} style={styles.fullImageIlan} />
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: 'rgb(202, 28, 28)', padding: 10, borderRadius: 5, position: 'absolute', top: 10, right: 10

        }} onPress={() => setResimmodalVisible(false)}>
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>
      </Modal>

      <Text style={styles.label}>Ürün Resimleri</Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={styles.cardsRowIlan}>
          <Card
            title="1/3"
            imageUrl={image1}
            handleOnpress={() => pickimage({ hangiimage: 1 })}
            handleResimsil={() => setImage1(null)}
          />
          <Card
            title="2/3"
            imageUrl={image2}
            handleOnpress={() => { if (image1 === null) { pickimage({ hangiimage: 1 }) } else { pickimage({ hangiimage: 2 }) } }}
            handleResimsil={() => setImage2(null)}
          />
          <Card
            title="3/3"
            imageUrl={image3}
            handleOnpress={() => { if (image1 === null) { pickimage({ hangiimage: 1 }) } else if (image2 === null) { pickimage({ hangiimage: 2 }) } else { pickimage({ hangiimage: 3 }) } }}
            handleResimsil={() => setImage3(null)}
          />
        </View>
      </ScrollView>

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
