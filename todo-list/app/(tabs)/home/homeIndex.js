import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const createfilterBtn = (txt) => {
  return (
    <Pressable style={styles.filterBtn}>
      <Text style={styles.filterTxt}>{txt}</Text>
    </Pressable>
  );
};

const Home = () => {
  const todoList = [];
  return (
    <>
      <View style={styles.filterContainer}>
        {createfilterBtn("All")}
        {createfilterBtn("Work")}
        {createfilterBtn("Personal")}
        <Pressable style={styles.addFilterBtn}>
          <AntDesign name="pluscircle" size={28} color="#007fff" />
        </Pressable>
      </View>
      <ScrollView style={styles.listViewContainer}>
        <View style={styles.listView}>
          {todoList?.length > 0 ? (
            <View></View>
          ) : (
            <Image
              style={styles.image}
              source={{
                url: "https://cdn-icons-png.flaticon.com/128/2387/2387679.png",
              }}
            />
          )}
          <Text style={styles.noTaskTxt}>
            No task for today! Please add one!
          </Text>
          <Pressable style={styles.addTaskBtn}>
            <AntDesign name="pluscircle" size={40} color="#007fff" />
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  filterContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  filterBtn: {
    backgroundColor: "#7CB9E8",
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  filterTxt: {
    color: "white",
    textAlign: "center",
  },
  addFilterBtn: {
    marginLeft: "auto",
  },
  listViewContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  listView: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop:130,
    marginLeft:"auto",
    marginRight:"auto",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  noTaskTxt: {
    fontSize: 16,
    marginTop: 15,
    fontWeight: "600",
  },
  addTaskBtn:{
    marginTop: 15,
  }
});
