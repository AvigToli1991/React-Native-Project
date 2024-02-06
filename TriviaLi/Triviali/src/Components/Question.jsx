import React, { useEffect, useState } from "react";
import questionBg from "../../assets/questionBg.png";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";


const screenWidth = Dimensions.get("window").width;

const Question = ({
  question,
  ans,
  setPoints,
  onNextQuestion,
  setRightAns,
  setIsWrong,
  setIsTimeOut,

}) => {
  const [styleAns, setStyles] = useState(Array(4).fill(styles.answer));
  const [correctAns, setCorrectAns] = useState(null);
  const [timer, setTimer] = useState(30);
  const [disableAnswers, setDisableAnswers] = useState(false);
  const [animatedWidth, setAnimatedWidth] = useState(
    new Animated.Value(screenWidth * 0.7)
  );

  let interval;

  useEffect(() => {
    setCorrectAns(ans.findIndex((answer) => answer.isCorrect));
    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);

    }, 1000);

    Animated.timing(animatedWidth, {
      toValue: -screenWidth*0.4,
      duration: 30000, // Duration in milliseconds
      easing: Easing.linear, // Linear animation
      useNativeDriver: false, // Make sure to set this to false for width animation
    }).start(); // Start the animation

    if (timer === 0) {
      clearInterval(interval);
      setDisableAnswers(true);
      setStyles(
        styleAns.map((item, i) =>
          i === correctAns ? styles.correct : styles.unsellect
        )
      );
      setTimeout(() => {
        setIsTimeOut(true);
        setDisableAnswers(false);
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [timer,animatedWidth]);

  const checkAns = (index) => {
    setDisableAnswers(true);
    clearInterval(interval);
    animatedWidth.stopAnimation();
    const newStylesSet = styleAns.map((item, i) =>
      i === index ? styles.selected : styles.answer
    );
    setStyles(newStylesSet);

    setTimeout(() => {
      setStyles(
        styleAns.map((item, i) =>
          i === correctAns
            ? styles.correct
            : i === index && index !== correctAns
            ? styles.incorrect
            : styles.unsellect
        )
      );

      setTimeout(() => {
        if (index != correctAns) {
          setIsWrong(true);
        } else {
          setRightAns((prevRightAns) =>
            index === correctAns ? prevRightAns + 1 : prevRightAns
          );
        }
        setTimer(30);
        setStyles(Array(4).fill(styles.answer));
        setCorrectAns(ans.findIndex((answer) => answer.isCorrect));
        setPoints((prevPoints) =>
          index === correctAns ? prevPoints + 5 : prevPoints
        );
        setDisableAnswers(false);
        setAnimatedWidth(new Animated.Value(screenWidth * 0.7));
        onNextQuestion(); // Move to the next question
      }, 2000);
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={questionBg} style={styles.question}>
        <Text style={styles.text}>{question}</Text>
      </ImageBackground>

      <FlatList
        data={ans}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => checkAns(index)}
            disabled={disableAnswers}
          >
            <View style={styleAns[index]}>
              <Text style={styles.text}>
                {String.fromCharCode(1488 + index)}.{" "}
              </Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => `${item.text}-${index}`}
        contentContainerStyle={{ marginVertical: 10 }}
      />

     
      <View 
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "70%",
          borderRadius: 50,
          backgroundColor: "gray",
        }}
      >
        {timer > 10 ? (
          <Animated.View
            style={{
              width: animatedWidth,
              height: 5,
              backgroundColor: "goldenrod",
              borderRadius: 50,
            }}
          />
        ) : (
          <Animated.View
            style={{
              width: animatedWidth,
              height: 5,
              backgroundColor: "red",
              borderRadius: 50,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex:1,
    gap:20,
  },
  question: {
    width:"auto",
    maxHeight: "auto",
    resizeMode:"contain",
    justifyContent:"center",
    alignItems:"center",
    marginLeft:"auto",
    marginRight:"auto",
    marginTop:70,
    paddingHorizontal: 50,
    paddingVertical:150,

  },
  answer: {
    width: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderTopLeftRadius: 50,
    borderBottomRightRadius:50,
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal:20,
    borderColor:"bla",
    borderWidth:2,

    
  },
  selected: {
    width: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderTopLeftRadius: 50,
    borderBottomRightRadius:50,
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal:20,
    borderColor:"blue",
    borderWidth:2,

  },
  correct: {
    width: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderTopLeftRadius: 50,
    borderBottomRightRadius:50,
    backgroundColor: "green",
    marginVertical: 5,
    marginHorizontal:20,
    borderColor:"blue",
    borderWidth:2,
  },
  incorrect: {
    width: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderTopLeftRadius: 50,
    borderBottomRightRadius:50,
    backgroundColor: "red",
    marginVertical: 5,
    marginHorizontal:20,
    borderColor:"blue",
    borderWidth:2,
  },
  unsellect: {
    width: "auto",
    display: "flex",
    flexDirection: "row-reverse",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderTopLeftRadius: 50,
    borderBottomRightRadius:50,
    backgroundColor: "#00000030",
    marginVertical: 5,
    marginHorizontal:20,
    borderWidth:2,
  },
  text: {
    textAlign: "center",
    color: "black",
    marginHorizontal: 5,
    fontWeight:600,
  },
});

export default React.memo(Question);
//"#f8af19"