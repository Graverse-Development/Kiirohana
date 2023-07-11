import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import Image from "react-native-scalable-image";
import EksData from "./../source/sources.js";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;
const imageHeight = (screenWidth / 2) * 3;

const ComicReaderScreen = ({ navigation, route }) => {
  const { title, ext, chapterTitle, url } = route.params;
  const [comicImages, setComicImages] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < comicImages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    console.log("Lebar layar :", screenWidth);
    let Ek = EksData.komik.find((x) => x.config.name == route.params.ext);
    Ek.getChapter(url).then(async (x) => {
      console.log(x.pages);
      setComicImages(x.pages);
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {comicImages.map((image, index) => (
          <ImageRender key={index} width={screenWidth} source={image} />
        ))}
      </ScrollView>
      <View style={styles.bottomPanel}>
        <Slider
          style={styles.progressBar}
          value={currentPage}
          onValueChange={(value) => handlePageChange(value)}
          minimumValue={1}
          maximumValue={5}
          trackClickable={true}
        />
      </View>
    </View>
  );
};

const ImageRender = ({ source, width, key }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!error) {
    return (
      <View key={key}>
        <Image
          width={width}
          source={{ uri: source }}
          onError={() => setError(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading ? <ImageLoading /> : ""}
      </View>
    );
  } else {
    return (
      <View
        style={{
          width: screenWidth,
          height: (screenWidth / 2) * 3,
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#101010",
        }}
      >
        <View>
          <Text style={{ textAlign: "center", fontSize: 35, color: "yellow" }}>
            (⁠´⁠;⁠︵⁠;⁠`⁠)
          </Text>
          <Text style={{ textAlign: "center", color: "white" }}>
            Gambar gagal dimuat!
          </Text>
        </View>
      </View>
    );
  }
};

const ImageLoading = () => {
  return (
    <View
      style={{
        width: screenWidth,
        height: (screenWidth / 2) * 3,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#101010",
      }}
    >
      <ActivityIndicator size="big" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomPanel: {
    width: screenWidth,
    height: 50,
    position: "fixed",
    zIndex: 5,
    bottom: 0,
    left: 0,
    backgroundColor: "black",
  },
});

export default ComicReaderScreen;
