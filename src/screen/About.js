import { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import EksData from "./../source/sources.js";

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const About = ({ navigation, route }) => {
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(route.params.url);

  useEffect(() => {
    if (about) {
      update();
    } else {
    }
  }, []);

  const update = () => {
    console.log(route.params);
    let Ek = EksData.komik.find((x) => x.config.name == route.params.ext);

    Ek.getKomik(url).then(async (x) => {
      console.log("Judul :", x.title);
      console.log(x);
      setAbout(x);
      setLoading(false);
    });
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "#101010",
        }}
      >
        <ActivityIndicator size="big" color="#0000ff" />
      </View>
    );
  } else {
    return (
      <ScrollView style={{ backgroundColor: "#101010" }}>
        <View>
          <Image style={styles.banner} source={{ uri: about.cover }} />
          <LinearGradient
            colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,1)"]}
            style={styles.main}
          >
            <Image style={styles.cover} source={{ uri: about.cover }} />
            <View style={styles.info}>
              <Text style={styles.title}>{about.title}</Text>
              <Text style={styles.textInfo}>
                {about.author.length !== 0
                  ? about.author
                      .map((x, i) =>
                        i == 0 ? x + " (Author)" : x + " (Artist)"
                      )
                      .join(", ")
                  : "Tidak ada"}
              </Text>
              <Text style={styles.textInfo}>
                {about.status == 3
                  ? "Hiatus"
                  : about.status == 2
                  ? "Ended"
                  : about.status == 1
                  ? "Ongoing"
                  : "Uknown"}{" "}
                • {route.params.ext}
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View style={{ marginTop: 5, ...styles.about }}>
          <Text style={styles.aboutText}>
            {about.synopsis ? about.synopsis : "Tidak ada sinopsis"}
          </Text>
          <Text style={styles.aboutText}>
            Alternative title:{" "}
            {about.alternative_title ? about.alternative_title : ""}
          </Text>
        </View>
        <View style={styles.genres}>
          {about.genres
            ? about.genres.map((x, i) => (
                <Text key={i} style={styles.genre}>
                  {x}
                </Text>
              ))
            : ""}
        </View>
        <Pressable style={styles.play}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Lanjutkan {about.chapters[0].title}
          </Text>
        </Pressable>
        <Text style={styles.chapterS}>{about.chapters.length} Bab</Text>
        <FlatList
          style={styles.chapters}
          data={about.chapters}
          renderItem={({ item, i }) => (
            <Chapter
              key={i}
              navigation={navigation}
              route={route}
              chapter={item}
            />
          )}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    );
  }
};

function Chapter({ navigation, route, chapter }) {
  const bukaChapter = () => {
    navigation.navigate("ComicRead", {
      title: route.params.title,
      ext: route.params.ext,
      chapterTitle: chapter.title,
      url: chapter.url,
    });
  };
  return (
    <Pressable style={styles.chapter} onPress={bukaChapter}>
      <Text style={styles.chapterName}>{chapter.title}</Text>
      <Text style={styles.chapterTime}>10/12/22 - Sudah Dibaca</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  main: {
    top: 0,
    position: "absolute",
    width: screenWidth,
    height: (screenWidth / 3) * 2,
    zIndex: 1,
  },
  cover: {
    width: screenWidth * 0.35,
    marginLeft: 10,
    marginTop: ((screenWidth / 3) * 2 - ((screenWidth * 0.35) / 2) * 3) / 2,
    height: ((screenWidth * 0.35) / 2) * 3,
    resizeMode: "cover",
  },
  banner: {
    width: screenWidth,
    height: (screenWidth / 3) * 2,
    resizeMode: "cover",
  },
  info: {
    color: "white",
    width: screenWidth * 0.5 + 10,
    height:
      (screenWidth / 3) * 2 -
      ((screenWidth / 3) * 2 - ((screenWidth * 0.35) / 2) * 3) / 2,
    position: "absolute",
    left: screenWidth * 0.35 + 20,
    top: 0 + ((screenWidth / 3) * 2 - ((screenWidth * 0.35) / 2) * 3) / 2,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  textInfo: {
    color: "#999999",
    fontWeight: "bold",
    fontSize: 13,
  },
  about: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  aboutText: {
    color: "white",
    marginBottom: 15,
  },
  play: {
    width: screenWidth - 20,
    marginLeft: 10,
    paddingVertical: 7,
    backgroundColor: "yellow",
  },
  chapterS: {
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  chapterName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  chapterTime: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#999999",
  },
  chapter: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderLeftWidth: 3,
    borderLeftColor: "white",
    borderLeftStyle: "solid",
    marginBottom: 5,
    marginLeft: 5,
  },
  genres: {
    width: screenWidth - 20,
    marginLeft: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 7,
  },
  genre: {
    marginRight: 5,
    marginBottom: 4,
    color: "white",
    fontSize: 14,
    borderWidth: 1.5,
    paddingHorizontal: 13,
    paddingVertical: 3,
    borderColor: "yellow",
    borderStyle: "solid",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 7,
  },
});

export default About;
