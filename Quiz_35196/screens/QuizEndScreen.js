import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/QuizEndStyle';

const QuizEndScreen = ({ route, navigation }) => {
  const { textTitle, correctAnswersScore, totalQuestions, types } = route.params;

  // Function to send POST request
  const sendResultsToServer = async () => {
    const url = 'http://tgryl.pl/quiz/results';
    const payload = {
      nick: 'niwd',
      score: correctAnswersScore,
      total: totalQuestions,
      type: types[1],
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Results sent successfully!');
      } else {
        console.error('Failed to send results.');
      }
    } catch (error) {
      console.error('Error while sending results:', error);
    }
  };

  useEffect(() => {
    sendResultsToServer();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations!!!</Text>
      <Text style={styles.titleTest}>{textTitle}</Text>
      <Text style={styles.text}>Correct Answers: {correctAnswersScore} out of {totalQuestions}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home Page')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Go to Home Page</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default QuizEndScreen;
