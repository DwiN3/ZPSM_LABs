// QuizScreen.js

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import styles from '../styles/QuizStyle';

const QuizScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionTime, setQuestionTime] = useState(0); // Update initial value to 0
  const [shouldStartTimer, setShouldStartTimer] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question
  const intervalRef = useRef(null);

  const route = useRoute();
  const { params } = route;
  const titleTest = params ? params.titleTest : null;
  const tasks = params ? params.tasks : [];

  useEffect(() => {
    if (titleTest) {
      navigation.setOptions({ title: titleTest });
      setQuestionTime(tasks[currentQuestion]?.duration || 0); // Set initial question time
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
          moveToNextQuestion();
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

  const moveToNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setQuestionTime(tasks[currentQuestion + 1]?.duration || 0);
    resetTimerFunction();
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
          <TouchableOpacity key={index} style={styles.answersButton}>
            <Text style={styles.answersButtonText} onPress={() => resetTimerFunction()}>
              {`Answer ${String.fromCharCode(65 + index)}`}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuizScreen;