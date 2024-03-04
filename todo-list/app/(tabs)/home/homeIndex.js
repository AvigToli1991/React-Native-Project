import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from "react-native";
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import React, { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';


const createfilterBtn = (txt) => {
  return (
    <Pressable style={styles.filterBtn}>
      <Text style={styles.filterTxt}>{txt}</Text>
    </Pressable>
  );
};

const Home = () => {
  const todoList = [];
  const [isModalVisible, setModalVisible] = useState(false);
  const [todo, setToDo] = useState("");

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
          <Pressable style={styles.addTaskBtn} onPress={()=> setModalVisible(!isModalVisible)}>
            <AntDesign name="pluscircle" size={40} color="#007fff" />
          </Pressable>
        </View>
      </ScrollView>

      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="add a todo" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={setModalVisible(!isModalVisible)}
      >
        <ModalContent style={styles.modalContent}>
          <View style={styles.viewModalTextInput}>
            <TextInput
              value={todo}
              placeholder="Input a new task here"
              onChangeText={(text) => setToDo(text)}
              style = {styles.modalTextInput}
            />
            <Ionicons name="send" size={24} color="#007fff" />
          </View>
        </ModalContent>
      </BottomModal>
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
    marginTop: 130,
    marginLeft: "auto",
    marginRight: "auto",
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
  addTaskBtn: {
    marginTop: 15,
  },
  modalContent: {
    width: "100%",
    height: 200,
  },
  modalTextInput:{
    padding:10,
    borderColor:"#E0E0E0",
    borderWidth:1,
    borderRadius:5,
    flex:1,
  },
  viewModalTextInput:{
    marginVertical:10,
    flexDirection:"row",
    alignItems:"center",
    gap:10
  }
});
