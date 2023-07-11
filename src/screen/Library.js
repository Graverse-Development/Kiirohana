import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";

let Pustaka = [];

export default function Library({ navigation, route }) {
  const [Pustaka, setPustaka] = useState([]);

  if (!Pustaka.length == 0) {
    return (
      <ScrollView style={{ backgroundColor: "#101010" }}>
        <View style={styles.container}>
          {Pustaka.map((ab, index) => CardPustaka(ab, type))}
        </View>
      </ScrollView>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#101010",
        }}
      >
        <View>
          <Text style={{ textAlign: "center", fontSize: 35, color: "yellow" }}>
            ರ⁠_⁠ರ
          </Text>
          <Text style={{ textAlign: "center", color: "white" }}>
            Library anda kosong!
          </Text>
        </View>
      </View>
    );
  }
}

function CardPustaka(about, type) {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <TouchableOpacity
      style={[card.card, isHovered && cardHover.card]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={about.title}
    >
      <Image
        style={[card.cover, isHovered && cardHover.cover]}
        source={{
          uri: about.cover,
        }}
      />
      <View style={[card.info, isHovered && cardHover.info]}>
        <Text style={[card.nama, isHovered && cardHover.nama]}>
          {about.title}
        </Text>
        <Text style={[card.total, isHovered && cardHover.total]}>
          5 {type == "manga" || "novel" ? "Bab" : "Episode"}
        </Text>
      </View>
      <Text style={card.unread}>0</Text>
    </TouchableOpacity>
  );
}

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const card = StyleSheet.create({
  card: {
    width: screenWidth * 0.45,
    height: ((screenWidth * 0.45) / 2) * 3,
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
    opacity: 0,
    width: "100%",
    bottom: 0,
    left: 0,
    position: "absolute",
    paddingHorizontal: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  nama: {
    fontWeight: "bold",
    color: "white",
    fontSize: 0,
  },
  total: {
    color: "white",
    fontSize: 0,
  },
  unread: {
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

const cardHover = StyleSheet.create({
  card: {
    width: screenWidth * 0.45,
    height: ((screenWidth * 0.45) / 2) * 3,
    backgroundColor: "#252525",
    shadowColor: "black",
    shadowOpacity: 0.75,
    shadowRadius: 4,
    marginLeft: (screenWidth - screenWidth * 0.45 * 2) / 3,
    marginTop: 5,
  },
  cover: {
    opacity: 0.75,
  },
  info: {
    opacity: 1,
  },
  nama: {
    fontWeight: "bold",
    color: "white",
    fontSize: 13,
  },
  total: {
    color: "white",
    fontSize: 13,
  },
  unread: {
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
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: screenHeight - 100,
  },
  text: {
    color: "white",
  },
});
