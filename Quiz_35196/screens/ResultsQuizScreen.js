// ResultsQuizScreen.js

import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../styles/ResultsQuizStyle';
import { userScores } from '../data/UserScores';

const ResultsQuiz = () => (
  <View style={styles.container}>
    <Text>Koniec Quizu {TitleTest}</Text>
    <Text>Poprawne odpowiedzi: </Text>
  </View>
);

export default ResultsQuiz;