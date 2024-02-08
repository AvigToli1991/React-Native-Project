import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from "expo-router";

const login = () => {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
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
          <Text style={styles.subTitle}>Log in to your account</Text>
        </View>
       
        {/*input email and password container*/}
        <View style={styles.emailAndPassContainer}>
          
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
          
          {/*forgot password and keep me loged in btns*/}
          <View style={styles.keepAndForgotContainer}>
            <Text style={styles.keepLoged}>Keep me loged in</Text>
            <Text style={styles.forgot}>Forgot my password</Text>
          </View>

          {/*login btn*/}
          <Pressable style={styles.loginBtn}>
            <Text style={styles.btnLoginTxt}>Login</Text>
          </Pressable>

          {/*register btn */}
          <Pressable style={styles.regisBtn} onPress={()=>router.replace('/register')}>
            <Text style={styles.btnRegistTxt}>Don't have an account ? Sign up</Text>
          </Pressable>
          
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

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
  emailAndPassContainer: {
    marginTop: 80,
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
  keepAndForgotContainer:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginTop:12,
    marginBottom:60,
  },
  keepLoged:{

  },
  forgot:{
    color:"#007FFF",
    fontWeight:"500",
  },
  loginBtn:{
    backgroundColor:"#6699CC",
    width:200,
    padding:15,
    borderRadius:6,
    marginLeft:"auto",
    marginRight:"auto",

  },
  btnLoginTxt:{
    textAlign:"center",
    color:"white",
    fontWeight:"bold",
    fontSize:16,
  },
  regisBtn:{
    marginTop:15,
  },
  btnRegistTxt:{
    textAlign:"center",
    fontSize:15,
    color:'gray',

  }
});
