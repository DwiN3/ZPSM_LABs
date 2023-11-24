// TestScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../QuizStyles';

const TestScreen = ({ route }) => {
  const { test } = route.params;

  return (
    <View style={styles.containerDrawer}>
      <Text style={styles.centeredText}>{test.titleTest}</Text>
      <View style={styles.tagsContainer}>
        {test.tags.map((tag, index) => (
          <TouchableOpacity key={index} onPress={() => console.log(`Pressed ${tag}`)}>
            <Text style={styles.tag}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.description}>{test.description}</Text>
    </View>
  );
};

export default TestScreen;
