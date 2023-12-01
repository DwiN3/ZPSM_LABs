// QuizScreen.js

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native'; // Import Alert for displaying feedback
import { useFocusEffect, useRoute } from '@react-navigation/native';
import styles from '../styles/QuizStyle';

const QuizScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);
  const [shouldStartTimer, setShouldStartTimer] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const intervalRef = useRef(null);

  const route = useRoute();
  const { params } = route;
  const titleTest = params ? params.titleTest : null;
  const tasks = params ? params.tasks : [];

  useEffect(() => {
    if (titleTest) {
      navigation.setOptions({ title: titleTest });
      setQuestionTime(tasks[currentQuestion]?.duration || 0);
      resetTimerFunction();
    }
  }, [titleTest, currentQuestion, tasks]);

  useEffect(() => {
    if (shouldStartTimer) {
      resetTimer();
      setShouldStartTimer(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [questionTime, shouldStartTimer]);

  useFocusEffect(
    React.useCallback(() => {
      setShouldStartTimer(true);
      return () => {
        clearInterval(intervalRef.current);
      };
    }, [])
  );

  const resetTimerFunction = () => {
    resetTimer();
    return () => {
      clearInterval(intervalRef.current);
    };
  };

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeElapsed((prevTime) => {
        const newTime = prevTime + 1;
        setProgress((prevProgress) => newTime / questionTime);

        if (newTime === questionTime) {
          clearInterval(intervalRef.current);
          console.log('Koniec czasu');
          handleAnswer(null); // Handle the case when the time runs out
        }

        return newTime;
      });
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setTimeElapsed(0);
    setProgress(0);
    startTimer();
  };

  const handleAnswer = (selectedAnswer) => {
    // Handle the selected answer
    clearInterval(intervalRef.current); // Stop the timer

    const isCorrect = tasks[currentQuestion]?.answers[selectedAnswer]?.isCorrect || false;
    const feedbackMessage = isCorrect ? 'Correct!' : 'Incorrect.';

    Alert.alert(
      'Answer Feedback',
      feedbackMessage,
      [
        {
          text: 'Next Question',
          onPress: () => moveToNextQuestion(),
        },
      ],
      { cancelable: false }
    );
  };

  const moveToNextQuestion = () => {
    if (currentQuestion + 1 < tasks.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setQuestionTime(tasks[currentQuestion + 1]?.duration || 0);
      resetTimerFunction();
    } else {
      // End of the quiz, you can navigate to a summary screen or take other actions
      console.log('End of the quiz');
    }
  };

  return (
    <View style={styles.containerQuiz}>
      <View style={styles.textContainer}>
        <Text style={styles.questionNumbersText}>{`Question ${currentQuestion + 1} of ${tasks.length}`}</Text>
        <Text style={styles.timeText}>Time: {questionTime - timeElapsed} sec</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={{ backgroundColor: 'yellow', height: 10, width: `${progress * 100}%` }} />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{tasks[currentQuestion]?.question}</Text>
      </View>
      <View style={styles.answersContainer}>
        {tasks[currentQuestion]?.answers.map((answer, index) => (
          <TouchableOpacity key={index} style={styles.answersButton} onPress={() => handleAnswer(index)}>
            <Text style={styles.answersButtonText}>{`Answer ${String.fromCharCode(65 + index)}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuizScreen;
