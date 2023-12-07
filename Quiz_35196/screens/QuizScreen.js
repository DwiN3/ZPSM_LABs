import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import axios from 'axios';
import Tests from '../data/Tests'; // Adjust the path accordingly
import styles from '../styles/QuizStyle';

const QuizScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionTime, setQuestionTime] = useState(0);
  const [shouldStartTimer, setShouldStartTimer] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [resetQuizFlag, setResetQuizFlag] = useState(false);
  const intervalRef = useRef(null);
  const prevTitleRef = useRef(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizData, setQuizData] = useState(null);

  async function fetchQuizData() {
    try {
      const response = await axios.get('https://tgryl.pl/quiz/test/62032610069ef9b2616c761e');
      const quizData = response.data;

      console.log('Received Quiz Data:', quizData);

      const testsObject = new Tests(
        quizData.name,
        quizData.tags,
        quizData.description,
        quizData.tasks.map(task => ({
          question: task.question,
          answers: task.answers.map(answer => ({
            content: answer.content,
            isCorrect: answer.isCorrect,
          })),
          duration: task.duration,
        }))
      );

      setQuizData(testsObject);

    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  }

  useEffect(() => {
    // Fetch quiz data when the component mounts
    fetchQuizData();
  }, []);

  useEffect(() => {
    if (quizData && quizData.titleTest && quizData.titleTest !== prevTitleRef.current) {
      navigation.setOptions({ title: quizData.titleTest });
      setResetQuizFlag(true);
      prevTitleRef.current = quizData.titleTest;
      resetQuiz();
    }
    setQuestionTime(quizData?.tasks[currentQuestion]?.duration || 0);
    resetTimer();
  }, [quizData, currentQuestion, resetQuizFlag]);

  useEffect(() => {
    if (shouldStartTimer) {
      resetTimer();
      setShouldStartTimer(false); // Fixed typo, setShouldStartTimer(false) instead of setShouldStartTimer(true)
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
          handleAnswer(null);
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

  const resetQuiz = () => {
    setProgress(0);
    setTimeElapsed(0);
    setShouldStartTimer(true);
    setCurrentQuestion(0);
    setCorrectAnswers(0);
  };

  const handleAnswer = (selectedAnswer) => {
    clearInterval(intervalRef.current);
    moveToNextQuestion(selectedAnswer);
  };

  let correctAnswersScore = 0;
  const alertEnd = () => {
    clearInterval(intervalRef.current);

    Alert.alert(
      'Quiz Finish',
      'Congratulations! You have completed the quiz.',
      [
        {
          text: 'Go to Results',
          onPress: () => {
            navigation.navigate('Quiz Completed', {
              textTitle: quizData?.titleTest || '',
              correctAnswersScore: correctAnswersScore,
              totalQuestions: quizData?.tasks.length || 0,
            });
          },
        },
      ],
    );
  };

  const moveToNextQuestion = (selectedAnswer) => {
    const isCorrect = quizData?.tasks[currentQuestion]?.answers[selectedAnswer]?.isCorrect || false;

    setCorrectAnswers((prevCorrectAnswers) => {
      const newCorrectAnswers = isCorrect ? prevCorrectAnswers + 1 : prevCorrectAnswers;
      correctAnswersScore = newCorrectAnswers;

      return newCorrectAnswers;
    });

    if (currentQuestion + 1 < quizData?.tasks.length) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setQuestionTime(quizData?.tasks[currentQuestion + 1]?.duration || 0);
      resetTimer();
    } else {
      alertEnd();
    }
  };

  return (
    <View style={styles.containerQuiz}>
      <View style={styles.textContainer}>
        <Text style={styles.questionNumbersText}>{`Question ${currentQuestion + 1} of ${quizData?.tasks.length || 0}`}</Text>
        <Text style={styles.timeText}>Time: {questionTime - timeElapsed} sec</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={{ backgroundColor: 'yellow', height: 10, width: `${progress * 100}%` }} />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{quizData?.tasks[currentQuestion]?.question}</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>{quizData?.description}</Text>
      </View>
      <View style={styles.answersContainer}>
        <View style={styles.buttonRow}>
          {quizData?.tasks[currentQuestion]?.answers.map((answer, index) => (
            <TouchableOpacity key={index} style={styles.answersButton} onPress={() => handleAnswer(index)}>
              <Text style={styles.answersButtonText}>{`${answer.content}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default QuizScreen;
