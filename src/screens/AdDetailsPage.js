import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");
const IMAGE_HEIGHT = height * 0.4;

const AdDetailsPage = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState(null);
  const [images, setImages] = useState([]);
  const [currentTab, setCurrentTab] = useState("details"); // Seçilen tab
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // Favori durumu
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false); // Açıklama durumu

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.post(
          "https://roomiefies.com/app/getilandetails.php",
          new URLSearchParams({ id })
        );
        const fetchedData = response.data;
        setData(fetchedData);
        setImages(
          [
            fetchedData.imageurl1,
            fetchedData.imageurl2,
            fetchedData.imageurl3,
          ].filter(Boolean)
        );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ilan details:", error);
        setLoading(false);
      }
    };
    const checkFavoriteStatus = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        try {
          const formData = new FormData();
          formData.append("ilanid", id);

          formData.append("token", token);
          const response = await axios.post("https://roomiefies.com/app/checkfavorite.php", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.data.isFavorite) {
            setIsFavorite(true);
          }
        } catch (error) {
          console.error("Error checking favorite status:", error);
        }
      }
    };
    checkFavoriteStatus();
    fetchDetails();
  }, [id]);


  const toggleFavorite = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      Alert.alert(
        "Aramıza Katılın",
        "Favori eklemek için giriş yapmanız gerekmektedir."
      );
      return;
    }
    try {
      const formData = new FormData();
      formData.append("ilanid", data.id);
      formData.append("token", token);
      console.log("Form data:", formData);
      const response = await axios.post(
        "https://roomiefies.com/app/userfavorite.php",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Favorite response:", response.data);

      if (response.data.sonuc === 1) {
        // Durumu tersine çevir
        setIsFavorite((prev) => !prev);
      } else {
        Alert.alert("Hata", response.data.mesaj || "Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Alert.alert("Hata", "Favori işlemi sırasında bir hata oluştu.");
    }
  };


  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(
      contentOffsetX / event.nativeEvent.layoutMeasurement.width
    );
    setCurrentImageIndex(index);
  };

  if (loading) {
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
    <ScrollView style={styles.container}>
      {/* Favori ve Paylaş butonları */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.roundButton} onPress={toggleFavorite}>
          <MaterialIcons
            name={isFavorite ? "favorite" : "favorite-border"}
            size={24}
            color="#4e9c2e"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.roundButton}>
          <FontAwesome name="share" size={24} color="#4e9c2e" />
        </TouchableOpacity>
      </View>

      {/* Resim Slider */}
      <View style={styles.imageContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {images.map((image, index) => (
            <Image
              key={index}
              source={{ uri: `https://roomiefies.com/app/${image}` }}
              style={styles.image}
            />
          ))}
        </ScrollView>
        {images.length > 0 && (
          <View style={styles.imageCounter}>
            <Text style={styles.counterText}>
              {currentImageIndex + 1}/{images.length}
            </Text>
          </View>
        )}
      </View>

      {/* İlan Adı */}
      <View style={styles.titleBox}>
        <Text style={styles.title}>{data.title || "Başlık Yok"}</Text>
      </View>

      {/* Seçilebilir Kutular */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === "details" && styles.activeTab,
          ]}
          onPress={() => setCurrentTab("details")}
        >
          <Text style={styles.tabText}>İlan Detayları</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            currentTab === "seller" && styles.activeTab,
          ]}
          onPress={() => setCurrentTab("seller")}
        >
          <Text style={styles.tabText}>Satıcı Bilgileri</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        {currentTab === "details" ? (
          <>
            <View>
              <Text style={styles.description}>
                {showFullDescription || data.description.length <= 40
                  ? data.description
                  : `${data.description.slice(0, 20)}...`}
              </Text>
              {data.description.length > 20 && (
                <TouchableOpacity
                  onPress={() => setShowFullDescription(!showFullDescription)}
                >
                  <Text style={styles.toggleText}>
                    {showFullDescription ? "Daha Az" : "Tümünü Gör"}
                  </Text>
                </TouchableOpacity>
              )}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label}>
                  İlan Tarihi: {data.date || "Belirtilmemiş"}
                </Text>
                <Text style={styles.label}>
                  İlan No: {data.id || "Belirtilmemiş"}
                </Text>
              </View>
              <Text style={styles.label}>
                Cinsiyet: {data.cinsiyet || "Belirtilmemiş"}
              </Text>
              <Text style={styles.label}>
                Yaş Aralığı: {data.yasaraligi || "Belirtilmemiş"}
              </Text>
              <Text style={styles.label}>
                Isıtma Türü: {data.isitmaturu || "Belirtilmemiş"}
              </Text>
              <Text style={styles.label}>
                Eşya Durumu: {data.esya || "Belirtilmemiş"}
              </Text>
              <Text style={styles.label}>
                Bina Yaşı: {data.binayasi || "Belirtilmemiş"}
              </Text>
              <Text style={styles.label}>
                Daire Tipi: {data.dairetipi || "Belirtilmemiş"}
              </Text>
              <Text style={styles.label}>
                Fiyat:{" "}
                {data.rent
                  ? `${Number(data.rent).toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}`
                  : "Belirtilmemiş"}
              </Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.label}>
              Satıcı Adı: {data.displayName || "Bilinmiyor"}
            </Text>
            <Text style={styles.label}>
              Satıcı Telefon: {data.phone || "Belirtilmemiş"}
            </Text>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    height: IMAGE_HEIGHT,
    backgroundColor: "#f5f5f5",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: width,
    height: IMAGE_HEIGHT,
    resizeMode: "cover",
  },
  imageCounter: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  counterText: {
    color: "#fff",
    fontSize: 14,
  },
  titleBox: {
    padding: 10,
    backgroundColor: "#4e9c2e",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: "#4e9c2e",
  },
  tabText: {
    color: "#000",
  },
  detailsContainer: {
    flexGrow: 1,
    padding: 15,

    marginBottom: 50,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 10,
  },
  toggleText: {
    color: "#4e9c2e",
    fontWeight: "bold",
    marginVertical: 5,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  actionButtons: {
    position: "absolute",
    top: 20,
    right: 10,
    zIndex: 10,
    flexDirection: "column",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
});

export default AdDetailsPage;