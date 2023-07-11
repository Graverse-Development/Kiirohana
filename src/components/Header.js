import { StyleSheet, View, Text, Dimensions } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome5";

function Header(props) {
  return (
    <View style={styles.body}>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
        {props.name}
      </Text>
      <Ico name="search"></Ico>
      <Ico name="ellipsis-v"></Ico>
    </View>
  );
}

function Ico({ name }) {
  return <Icon style={styles.icon} name={name}></Icon>;
}

let screenWidth = Dimensions.get("window").width;
let screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#202020",
    height: 50,
    width: "100%",
    lineHeight: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    width: screenWidth - 20 - 2 * 40,
    paddingLeft: 15,
    textAlignVertical: "center",
    fontWeight: "bold",
    color: "white",
  },
  icon: {
    width: 40,
    height: 50,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 50,
    color: "white",
  },
});

export default Header;
