<<<<<<< Updated upstream
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { TestsList } from '../data/Tests';
=======
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl, NetInfo } from 'react-native';
import { Network } from 'expo';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> Stashed changes
import styles from '../styles/HomePageStyle';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  } else {
    return text;
  }
};

const HomePageScreen = ({ navigation }) => {
<<<<<<< Updated upstream
  const TestsListWithNewItem = [...TestsList, { resultsItem: true }];
=======
  const [testsList, setTestsList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchTests = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/tests');
      const data = await response.json();
      const shuffledTests = [...data].sort(() => Math.random() - 0.5);
      const testsWithResults = [...shuffledTests, { resultsItem: true }];
      setTestsList(testsWithResults);
      await AsyncStorage.setItem('testsList', JSON.stringify(testsWithResults));
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const loadTestsFromStorage = async () => {
    try {
      const storedTests = await AsyncStorage.getItem('testsList');
      if (storedTests) {
        setTestsList(JSON.parse(storedTests));
      }
    } catch (error) {
      console.error('Error loading tests from AsyncStorage:', error);
    }
  };

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    const isConnected = await checkInternetConnectivity();
    if (isConnected) {
      fetchTests();
    } else {
      loadTestsFromStorage();
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      const isConnected = await checkInternetConnectivity();
      if (isConnected) {
        fetchTests();
      } else {
        // Use locally stored tests if no internet connection
        loadTestsFromStorage();
      }
    };

    loadData();
  }, []);
>>>>>>> Stashed changes

  const renderResultsItem = ({ item }) => {
    if (item.resultsItem) {
      return (
        <View style={styles.resultsItem}>
          <Text style={styles.resultsItemText}>Get to know your ranking result</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Results')}>
            <View style={styles.resultsItemButton}>
              <Text style={styles.resultsItemButtonText}>Check!</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() =>
<<<<<<< Updated upstream
            navigation.navigate('Test', { test: item, titleTest: item.titleTest })
=======
            navigation.navigate('Test', { test: item, titleTest: item.titleTest, tasks: item.tasks, description: item.description, startTest: true  })
>>>>>>> Stashed changes
          }
        >
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
        renderItem={renderResultsItem}
        keyExtractor={(item) => item.titleTest || 'resultsItem'}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

export default HomePageScreen;