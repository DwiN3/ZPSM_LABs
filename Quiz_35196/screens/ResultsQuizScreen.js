// ResultsQuizScreen.js

import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/ResultsQuizStyle';

const ResultsQuizScreen = ({ route }) => {
  const { textTitle, correctAnswers, totalQuestions } = route.params;

  return (
    <View style={styles.container}>
      <Text>Koniec Quizu</Text>
      <Text>{textTitle}</Text>
      <Text>Poprawne odpowiedzi: {correctAnswers} z {totalQuestions}</Text>
    </View>
  );
};

export default ResultsQuizScreen;
