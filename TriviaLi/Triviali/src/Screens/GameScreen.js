import React, { useEffect, useState } from "react";
import youwin from "../../assets/youwin.png";
import Youlost from "../../assets/Youlost.png";
import timeout from "../../assets/timeout.png";
import Continue from "../../assets/continue.png";
import home from "../../assets/home.png";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Modal,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import data from "../../data.json";
import Question from "../Components/Question";
import Shuffle from "../Algorithm/Shuffle";
let imageSource;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const GameScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState(Shuffle(data.questions));
  const [points, setPoints] = useState(0);
  const currentQuestion = questions[0];
  const [modalVisible, setModalVisible] = useState(false);
  const [rightAns, setRightAns] = useState(0);
  const [qPLvl, setQPLvl] = useState(5);
  const [stopGame, setStopGame] = useState(false);
  const [startOver, setstartOver] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const [isTimeOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    if (rightAns === qPLvl) {
      setModalVisible(true);
      setStopGame(true);
      setIsWrong(false);
    } else if (isWrong || isTimeOut) {
      setstartOver(true);
      setModalVisible(true);
      setStopGame(true);
    }
  }, [rightAns, qPLvl, isWrong, isTimeOut]);

  const handleNextQuestion = () => {
    // Remove the current question from the list
    setQuestions(questions.slice(1));
  };

  const handlePassLevel = () => {
    setModalVisible(false);
    setStopGame(false);
    setQPLvl(Math.floor(qPLvl * 1.3));
    setRightAns(0);
    console.log(qPLvl);
    setIsWrong(false);
    setIsTimeOut(false);
    handleNextQuestion();
  };

  const handleStartOver = () => {
    setQuestions(Shuffle(data.questions));
    setRightAns(0);
    setQPLvl(5);
    setModalVisible(false);
    setPoints(0);
    setIsWrong(false);
    setStopGame(false);
    setIsTimeOut(false);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      style={styles.imageBackground}
    >
      <SafeAreaView style={styles.container}>
        {!stopGame && currentQuestion && (
          <Question
            question={currentQuestion.question}
            ans={Shuffle(currentQuestion.answers)} // Shuffle answers here
            setPoints={setPoints}
            onNextQuestion={handleNextQuestion} // Pass a callback to handle next question
            setRightAns={setRightAns}
            setIsWrong={setIsWrong}
            setIsTimeOut={setIsTimeOut}
          />
        )}
  
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setStopGame(false);
            setModalVisible(!modalVisible);
          }}
        >
          <ImageBackground
            source={rightAns === qPLvl ? youwin : isTimeOut ? timeout : Youlost}
            style={styles.modalViewStyle}
          >
            <View style={styles.modalContainer}>
              <TouchableOpacity
                onPress={
                  startOver
                    ? () => {
                        handleStartOver();
                      }
                    : () => handlePassLevel()
                }
              >
                <View style={styles.modalBtn}>
                  <Image
                    source={Continue}
                    style={{ resizeMode: "cover", width: 150 }}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <View style={styles.modalBtn}>
                  <Image
                    source={home}
                    style={{ resizeMode: "cover", width: 150 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent:"center",
    height: screenHeight,
    width: screenWidth,
    gap: 25,
  },
  text: {
    fontSize: 30,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
  },
  modalViewStyle: {
    width: screenWidth,
    height: screenHeight,
    justifyContent: "flex-end",
    alignItems: "center",
    resizeMode: "cover",
    paddingBottom: 100,
  },
  modalContainer: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  modalMessage: {
    fontWeight: 500,
    textAlign: "center",
  },
  modalBtn: {
    borderRadius: 50,
    backgroundColor: "white",
    borderColor:"black",
    borderWidth:2,
  },
});

export default React.memo(GameScreen);
