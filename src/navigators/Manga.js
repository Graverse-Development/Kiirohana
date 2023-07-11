import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ico from "react-native-vector-icons/MaterialCommunityIcons";
import { useState, useEffect } from "react";
import { Dimensions, View, Text, StyleSheet, Animated } from "react-native";
const Tab = createBottomTabNavigator();

import Header from "./../components/Header.js";
import Library from "./../screen/Library.js";
import Search from "./../screen/Ekstensi.js";

let backgroundColor = "#101010";

function Dev() {
  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <Text style={{ color: "white" }}>On Development</Text>
    </View>
  );
}

function MangaScreen({ navigation, route }) {
  const fontSizeAnim = 13; //useState(new Animated.Value(0));

  useEffect(() => {
    /*Animated.timing(fontSizeAnim, {
      toValue: 13,
      duration: 500,
      easing: Easing.linear,
    }).start();*/
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Library"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#e91e63",
        tabBarStyle: {
          backgroundColor: "#202020",
          display: "flex",
          border: "0",
          outline: "0",
        },
      }}
    >
      <Tab.Screen
        name="Library"
        component={Library}
        initialParams={{ type: "manga" }}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconName = "library";

            if (focused) {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.iconFocused} name={iconName} />
                  <View style={NavBar.view}>
                    <Text style={{ fontSize: fontSizeAnim, ...NavBar.text }}>
                      Library
                    </Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.icon} name={iconName} />
                </View>
              );
            }
          },
          header: () => <Header name={"Manga Library"} />,
        }}
        style={{ backgroundColor: backgroundColor }}
      />
      <Tab.Screen
        name="Pembaruan"
        component={Dev}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconName = "tree";

            if (focused) {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.iconFocused} name={iconName} />
                  <View style={NavBar.view}>
                    <Text style={NavBar.text}>Pembaruan</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.icon} name={iconName} />
                </View>
              );
            }
          },
          header: () => <Header name={"History"} />,
        }}
      />
      <Tab.Screen
        name="History"
        component={Dev}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconName = "history";

            if (focused) {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.iconFocused} name={iconName} />
                  <View style={NavBar.view}>
                    <Text style={NavBar.text}>Library</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.icon} name={iconName} />
                </View>
              );
            }
          },
          header: () => <Header name={"History"} />,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        initialParams={{ type: "manga" }}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconName = "search-web";
            if (focused) {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.iconFocused} name={iconName} />
                  <View style={NavBar.view}>
                    <Text style={NavBar.text}>Library</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.icon} name={iconName} />
                </View>
              );
            }
          },
          header: () => <Header name={"Search"} />,
        }}
      />
      <Tab.Screen
        name="More"
        component={Dev}
        initialParams={{ type: "manga" }}
        options={{
          tabBarIcon: ({ focused }) => {
            let iconName = "dots-horizontal";
            if (focused) {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.iconFocused} name={iconName} />
                  <View style={NavBar.view}>
                    <Text style={NavBar.text}>More</Text>
                  </View>
                </View>
              );
            } else {
              return (
                <View style={NavBar.container}>
                  <Ico style={NavBar.icon} name={iconName} />
                </View>
              );
            }
          },
        }}
      />
    </Tab.Navigator>
  );
}

let NavBar = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  view: {
    backgroundColor: "yellow",
    borderRadius: 5,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
    paddingLeft: 3,
    marginLeft: -7,
  },
  text: {
    fontWeight: "bold",
  },
  icon: {
    width: 50,
    height: 50,
    lineHeight: 50,
    verticalAlign: "middle",
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
  iconFocused: {
    width: 30,
    height: 30,
    lineHeight: 30,
    verticalAlign: "middle",
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "yellow",
    color: "black",
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
  },
});

export default MangaScreen;
