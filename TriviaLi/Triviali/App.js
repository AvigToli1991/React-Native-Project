import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import GameScreen from "./src/Screens/GameScreen";
import HomeScreen from "./src/Screens/HomeScreen";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <React.StrictMode>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false, // Hide the header for all screens
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </React.StrictMode>
  );
};

export default MyStack;
