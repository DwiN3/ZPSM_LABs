// ResultsQuizScreen.js

import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../styles/ResultsQuizStyle';

const ResultsQuiz = ({ route }) => {
  const { correctAnswers } = route.params;

  return (
    <View style={styles.container}>
      <Text>Koniec Quizu</Text>
      <Text>Poprawne odpowiedzi: {correctAnswers}</Text>
    </View>
  );
};

export default ResultsQuiz;