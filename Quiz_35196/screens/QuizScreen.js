import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/QuizStyle';

const QuizScreen = ({ }) => {
  const [progress, setProgress] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((prevTime) => prevTime + 1);
      setProgress((prevProgress) => (prevProgress + 1) / 10);
    }, 1000);

    // Clear interval after 10 seconds
    setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <View style={styles.containerQuiz}>
      <View style={styles.textContainer}>
        <Text style={styles.questionNumbersText}>Question 3 of 10</Text>
        <Text style={styles.timeText}>Time: {10 - timeElapsed} sec</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={{ backgroundColor: 'yellow', height: 10, width: `${progress * 100}%` }} />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          This is some example of a long question to fill the content?
        </Text>
        <Text style={styles.descriptionText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit. vulputate eu pharetra nec, mattis ac neque. Duis vulputate commod...
        </Text>
      </View>
      <View style={styles.answersContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.answersButton}>
            <Text style={styles.answersButtonText}>Answer A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answersButton}>
            <Text style={styles.answersButtonText}>Answer B</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.answersButton}>
            <Text style={styles.answersButtonText}>Answer C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.answersButton}>
            <Text style={styles.answersButtonText}>Answer D</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuizScreen;
