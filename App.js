import React from "react";
import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Header from "./src/components/Header.js";

import MangaScreen from "./src/navigators/Manga.js";
import EksUpdate from "./src/screen/EksTerbaru.js";
import About from "./src/screen/About.js";

//Enjoy
import ComicRead from "./src/enjoyed/ComicRead.js";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Manga"
            component={MangaScreen}
            options={{
              headerShown: false,
            }}
            style={{ backgroundColor: "#101010" }}
          />
          <Stack.Screen
            name="Ekpdate"
            component={EksUpdate}
            screenOptions={{
              headerShown: true,
            }}
            options={({ navigation, route }) => ({
              header: () => <Header name={route.params.name} />,
            })}
          />
          <Stack.Screen
            name="About"
            component={About}
            screenOptions={{
              headerShown: true,
            }}
            options={({ navigation, route }) => ({
              header: () => <Header name={route.params.title} />,
            })}
          />
          <Stack.Screen
            name="ComicRead"
            component={ComicRead}
            options={{
              headerShown: false,
            }}
            style={{ backgroundColor: "#101010" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
