// QuizEndScreen.js

import React from 'react';
<<<<<<< Updated upstream:Quiz_35196/screens/ResultsQuizScreen.js
import { ScrollView, View, Text } from 'react-native';
import styles from '../styles/ResultsQuizStyle';

const ResultsQuiz = ({ route }) => {
  const { correctAnswers } = route.params;
=======
import { View, Text } from 'react-native';
import styles from '../styles/QuizEndStyle';

const QuizEndScreen = ({ route }) => {
  const { textTitle, correctAnswers, totalQuestions } = route.params;
>>>>>>> Stashed changes:Quiz_35196/screens/QuizEndScreen.js

  return (
    <View style={styles.container}>
      <Text>Koniec Quizu</Text>
      <Text>Poprawne odpowiedzi: {correctAnswers}</Text>
    </View>
  );
};

<<<<<<< Updated upstream:Quiz_35196/screens/ResultsQuizScreen.js
export default ResultsQuiz;
=======
export default QuizEndScreen;
>>>>>>> Stashed changes:Quiz_35196/screens/QuizEndScreen.js
