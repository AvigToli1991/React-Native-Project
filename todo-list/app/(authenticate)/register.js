import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from 'axios';

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const user = {
      name:name,
      email:email,
      password:password
    }

     axios.post("http://172.20.10.8:3000/register",user).then((response)=>{
      console.log(response);
      Alert.alert("Registrition successfuly","You have been registered successfuly");
      setEmail("");
      setName("");
      setPassword("");
    }).catch((error)=>{
      Alert.alert("Registrition Failed","an error acurred during registration");
      console.log("error",error);
    });

    () => router.replace("/login");
  }
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      {/*title*/}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>TODO-LIST TRACKER</Text>
      </View>

      {/*view that avoid from the keyboard hight*/}
      <KeyboardAvoidingView>
        {/*subtitle*/}
        <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>Register to your account</Text>
        </View>

        {/*input email and password and name container*/}
        <View style={styles.emailAndPassAndNameContainer}>
          {/*input name container*/}
          <View style={styles.inputContainer}>
            {/*input name logo*/}
            <Ionicons name="person" size={24} color="gray" />

            {/*Input text of name */}
            <TextInput
              style={styles.Input}
              placeholder="Enter your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>
          {/*input email container*/}
          <View style={styles.inputContainer}>
            {/*input email logo*/}
            <MaterialIcons name="email" size={24} color="gray" />

            {/*Input text of email */}
            <TextInput
              style={styles.Input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {/*input password container*/}
          <View style={styles.inputContainer}>
            {/*input password logo*/}
            <AntDesign name="lock1" size={24} color="gray" />

            {/*Input text of password */}
            <TextInput
              style={styles.Input}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </View>
        </View>

        {/*register btn*/}
        <Pressable style={styles.regisBtn} onPress={handleRegister}>
          <Text style={styles.btnRegTxt}>Register</Text>
        </Pressable>

        {/*login btn */}
        <Pressable
          style={styles.loginBtn}
          onPress={() => router.replace("/login")}
        >
          <Text style={styles.btnLoginTxt}>
            Already have an account ? Log in
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({
  SafeAreaView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
  titleContainer: {
    marginTop: 80,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0066b2",
  },
  subTitleContainer: {
    alignItems: "center",
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
  Input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 17,
    textAlign: "left",
  },
  emailAndPassAndNameContainer: {
    marginTop: 80,
    marginBottom: 60,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 20,
    gap: 10,
  },
  regisBtn: {
    backgroundColor: "#6699CC",
    width: 200,
    padding: 15,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
  },
  btnRegTxt: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginBtn: {
    marginTop: 15,
  },
  btnLoginTxt: {
    textAlign: "center",
    fontSize: 15,
    color: "gray",
  },
});
