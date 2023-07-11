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
  Animated
} from "react-native";

import EksData from "./../source/sources.js";

let Ekstensi = [];

export default function Search({ navigation, route }) {
  let type = route.params.type;
  if (type === "manga") {
    console.log(EksData.komik);
    Ekstensi = EksData.komik;
  } else {
    Ekstensi = [];
  }
  return (
    <ScrollView style={{ backgroundColor: "#101010" }}>
      <View style={eko.listEkstensiTerinstal}>
        <View style={eko.group}>
          <Text style={eko.groupt}>Pinned</Text>
          {Ekstensi.map((about, index) => (
            <TouchableOpacity
              style={eko.item}
              onPress={() =>
                navigation.navigate("Ekpdate", { name: about.config.name })
              }
              key={about.config.name}
            >
              <Image style={eko.itemimg} source={{ uri: about.config.icon }} />
              <View style={eko.about}>
                <Text style={eko.itemname}>{about.config.name}</Text>
                <View>
                  <Text style={[eko.badge, eko.lang]}>{about.config.lang}</Text>
                  <Text style={[eko.badge, eko.serv]}>
                    {about.config?.server == "local"
                      ? "Local Server"
                      : "Cloud Server"}
                  </Text>
                  <Text style={[eko.badge, eko.age]}>
                    {about.config?.age ? "18+" : ""}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const eko = StyleSheet.create({
  listEkstensiTerinstal: {
    width: "95%",
    margin: "0 auto",
  },
  group: {
    marginVertical: 10,
  },
  groupt: {
    color: "white",
    paddingHorizontal: 5,
    paddingVertical: 5,
    fontSize: 15,
    fontWeight: "bold",
  },

  item: {
    flexDirection: "row",
    width: "100%",
    overflow: "hidden",
    marginVertical: 10,
  },
  itemimg: {
    width: 50,
    height: 50,
  },
  about: {
    height: 50,
    paddingLeft: 5,
    overflow: "hidden",
  },
  itemname: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    textAlignVertical: "center",
    height: 25,
  },
  badge: {
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 5,
    paddingVertical: 3,
    marginRight: 5,
  },

  lang: {
    color: "yellow",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "yellow",
  },
  serv: {
    color: "lightblue",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "lightblue",
  },

  age: {
    color: "mediumpurple",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "mediumpurple",
  },
});
