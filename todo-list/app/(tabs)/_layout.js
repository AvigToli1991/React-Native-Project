import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const tabScreenHandler = (name, iconFcused, iconUnFoccused) => {
  return (
    <Tabs.Screen
      name={name}
      options={{
        tabBarLabel: name.charAt(0).toUpperCase() + name.slice(1),
        tabBarLabelStyle: styles.tabBarLabelStyle,
        headerShown: false,
        tabBarIcon: ({ focused }) => (focused ? iconFcused : iconUnFoccused),
      }}
    />
  );
};

export default function Layout() {
  return (
    <Tabs>
      {tabScreenHandler(
        "home",
        <FontAwesome name="tasks" size={24} color="#7CB9E8" />,
        <FontAwesome name="tasks" size={24} color="black" />
      )}
      {tabScreenHandler(
        "calendar",
        <AntDesign name="calendar" size={24} color="#7CB9E8" />,
        <AntDesign name="calendar" size={24} color="black" />
      )}
      {tabScreenHandler(
        "profile",
        <AntDesign name="profile" size={24} color="#7CB9E8" />,
        <AntDesign name="profile" size={24} color="black" />
      )}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    color: "#7CB9E8",
  },
});
