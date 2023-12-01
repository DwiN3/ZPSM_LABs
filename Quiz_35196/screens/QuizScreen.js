import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import styles from '../styles/QuizStyle';
import { TestsList } from '../data/Tests';

const QuizScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionTime, setQuestionTime] = useState(15);
  const [shouldStartTimer, setShouldStartTimer] = useState(true);
  const intervalRef = useRef(null);

  const route = useRoute();
  const { params } = route;
  const titleTest = params ? params.titleTest : null;

 // Inside the useEffect block
useEffect(() => {
  console.log("Title Test:", titleTest);
  if (titleTest) {
    const currentTest = TestsList.find((test) => test.titleTest === titleTest);
    console.log("Current Test:", currentTest);
    if (currentTest) {
      navigation.setOptions({ title: titleTest });
      const currentQuestion = currentTest.tasks[currentQuestionIndex];
      if (currentQuestion) {
        setQuestionTime(currentQuestion.duration);
      }
    }
    return () => {
      clearInterval(intervalRef.current);
    };
  }
}, [titleTest, currentQuestionIndex]);

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

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setTimeElapsed((prevTime) => {
        const newTime = prevTime + 1;
        setProgress((prevProgress) => newTime / questionTime);

        if (newTime === questionTime) {
          clearInterval(intervalRef.current);
          console.log('Koniec czasu');
          handleNextQuestion();
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

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setShouldStartTimer(true);
  };

  if (currentQuestionIndex >= TestsList.length) {
    // All questions answered, navigate to result screen or handle accordingly
    return (
      <View style={styles.containerQuiz}>
        <Text>Quiz Completed!</Text>
      </View>
    );
  }

  const currentTest = TestsList.find((test) => test.titleTest === titleTest);
  const currentQuestion = currentTest.tasks[currentQuestionIndex];

  return (
    <View style={styles.containerQuiz}>
      <View style={styles.textContainer}>
        <Text style={styles.questionNumbersText}>{`Question ${currentQuestionIndex + 1} of ${TestsList.length}`}</Text>
        <Text style={styles.timeText}>{`Time: ${questionTime - timeElapsed} sec`}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={{ backgroundColor: 'yellow', height: 10, width: `${progress * 100}%` }} />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        <Text style={styles.descriptionText}>{currentTest.description}</Text>
      </View>
      <View style={styles.answersContainer}>
        {currentQuestion.answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={styles.answersButton}
            onPress={() => {
              clearInterval(intervalRef.current);
              handleNextQuestion();
            }}
          >
            <Text style={styles.answersButtonText}>{`Answer ${String.fromCharCode(65 + index)}`}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default QuizScreen;
