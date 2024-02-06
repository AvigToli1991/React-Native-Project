import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import FadeInView from "../Components/FadeInView";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.ImageBackground}
    >
      <View style={styles.container}>
        <FadeInView>
          <ImageBackground
            source={require("../../assets/logo1.png")}
            style={styles.logo}
          >
            <Image
              source={require("../../assets/logo2.png")}
              style={{ width: 275, height: 275 }}
            />
          </ImageBackground>
        </FadeInView>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Game");
          }}
        >
          <View style={styles.startGame}>
            <Image
              source={require("../../assets/start.png")}
              style={{ resizeMode: "contain" }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 100,
  },

  text: {
    fontSize: 30,
    color: "white",
  },
  startGame: {
    backgroundColor: "white",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 2,
    width: 200,
  },
  logo: {
    resizeMode: "contain",
    width: 275,
    height: 275,
    paddingTop: 30,
  },
});

export default HomeScreen;
