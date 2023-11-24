// HomePageScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { TestsList } from '../data/Tests';
import styles from '../styles/QuizStyles';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  } else {
    return text;
  }
};

const HomePageScreen = ({ navigation }) => {
  const TestsListWithNewItem = [...TestsList, { specialItem: true }];

  const renderItem = ({ item }) => {
    if (item.specialItem) {
      return (
        <View style={styles.specialItem}>
          <Text style={styles.specialItemText}>Get to know your ranking result</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Results')}>
            <View style={styles.specialItemButton}>
              <Text style={styles.specialItemButtonText}>Check!</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Test', { test: item })}>
          <View style={[styles.testItem, styles.regularItem]}>
            <Text style={styles.titleTest}>{item.titleTest}</Text>
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, index) => (
                <TouchableOpacity key={index} onPress={() => console.log(`Pressed ${tag}`)}>
                  <Text style={styles.tag}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.description}>{truncateText(item.description, 100)}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.containerHome}>
      <FlatList
        data={TestsListWithNewItem}
        renderItem={renderItem}
        keyExtractor={(item) => item.titleTest || 'specialItem'}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default HomePageScreen;
