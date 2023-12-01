// QuizEndScreen.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/QuizEndStyle';

const QuizEndScreen = ({ route, navigation }) => {
  const { textTitle, correctAnswers, totalQuestions } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations!!!</Text>
      <Text style={styles.titleTest}>{textTitle}</Text>
      <Text style={styles.text}>Correct Answers: {correctAnswers} out of {totalQuestions}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home Page')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Go to Home Page</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QuizEndScreen;
