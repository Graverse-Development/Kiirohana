import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import EksData from "./../source/sources.js";

function CardPustaka({ navigation, route, item }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const kunjungi = () => {
    navigation.navigate("About", {
      title: item.title,
      url: item.url,
      ext: route.params.name,
    });
  };

  return (
    <Pressable onPress={kunjungi} style={card.card}>
      <Image
        style={card.cover}
        source={{
          uri: item.cover,
        }}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.2)", "rgba(0,0,0,1)"]}
        style={card.info}
      >
        <Text style={card.nama}>{item.title}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="big" color="#0000ff" />
    </View>
  );
};

export default function EksUpdate({ navigation, route }) {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    update();
  }, []);

  const update = () => {
    let Ek = EksData.komik.find((x) => x.config.name == route.params.name);
    if (loading === false) {
      setLoading(true);
      Ek.getUpdate(page).then(async (x) => {
        console.log("Halaman :", page);
        console.log(
          "Data Baru :",
          x.map((n) => n.url)
        );
        setItems((oldArray) => [...oldArray, ...x]);
        setPage(page + 1);
        setLoading(false);
      });
    }
  };
  return (
    <View style={{ backgroundColor: "#101010", flex: 1 }}>
      <FlatList
        style={styles.container}
        data={items}
        numColumns={2}
        onEndReached={update}
        onEndReachedThreshold={1.5}
        renderItem={({ item }) => (
          <CardPustaka navigation={navigation} route={route} item={item} />
        )}
        keyExtractor={(item, index) => index}
        ListFooterComponent={loading ? <Loading /> : null}
      />
    </View>
  );
}

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const card = StyleSheet.create({
  card: {
    width: screenWidth * 0.45,
    height: ((screenWidth * 0.45) / 2) * 3,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#252525",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    marginLeft: (screenWidth - screenWidth * 0.45 * 2) / 3,
    marginTop: 5,
  },
  cover: {
    flex: 1,
    resizeMode: "cover",
  },
  info: {
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
    paddingHorizontal: 5,
    textAlign: "center",
    padding: "5px 0",
  },
  nama: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  total: {
    color: "white",
    fontSize: 0,
  },
  pustaka: {
    paddingVertical: 4,
    paddingHorizontal: 7,
    backgroundColor: "orangered",
    color: "white",
    position: "absolute",
    left: 4,
    top: 4,
    borderRadius: 5,
    fontSize: 13,
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 56,
  },
  text: {
    color: "white",
  },
});
