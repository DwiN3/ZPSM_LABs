// QuizEndScreen.js

import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/QuizEndStyle';

const QuizEndScreen = ({ route }) => {
  const { textTitle, correctAnswers, totalQuestions } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Completed</Text>
      <Text>{textTitle}</Text>
      <Text style={styles.text}>Correct Answers: {correctAnswers} out of {totalQuestions}</Text>
    </View>
  );
};

export default QuizEndScreen;
