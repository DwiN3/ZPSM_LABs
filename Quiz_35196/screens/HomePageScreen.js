import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/HomePageStyle';

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + '...';
  } else {
    return text;
  }
};

const HomePageScreen = ({ navigation }) => {
  const [testsList, setTestsList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const fetchTests = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/tests');
      const data = await response.json();
      const shuffledTests = [...data].sort(() => Math.random() - 0.5);
      const testsWithResults = [...shuffledTests, { resultsItem: true }];

      await AsyncStorage.setItem('tests', JSON.stringify(testsWithResults));
      setTestsList(testsWithResults);
      setIsOnline(true);
    } catch (error) {
      console.error('Error fetching tests:', error);
      setIsOnline(false);
    } finally {
      setIsRefreshing(false);
    }
  };

  const loadTestsFromStorage = async () => {
    try {
      const storedTests = await AsyncStorage.getItem('tests');
      if (storedTests) {
        setTestsList(JSON.parse(storedTests));
      } else {
        fetchTests();
      }
    } catch (error) {
      console.error('Error loading tests from storage:', error);
    }
  };

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchTests();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);
    });

    NetInfo.fetch().then((state) => {
      setIsOnline(state.isConnected);
    });

    loadTestsFromStorage();

    return () => {
      unsubscribe();
    };
  }, []);

  const renderResultsItem = ({ item }) => {
    if (!isOnline) {
      return (
        <View style={styles.resultsItem}>
          <Text style={styles.resultsItemText}>You are currently offline. Please check your internet connection.</Text>
        </View>
      );
    } else if (item.resultsItem) {
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
      const maxDescriptionLength = item.name.length > 30 ? 50 : 100;
      return (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Test', {
              testId: item.id,
              titleTest: item.name,
              typeTest: item.type,
            })
          }
        >
          <View style={[styles.testItem, styles.regularItem]}>
            <Text style={styles.titleTest}>{item.name}</Text>
            <View style={styles.tagsContainer}>
              {item.tags.map((tag, index) => (
                <TouchableOpacity key={index} onPress={() => console.log(`Pressed ${tag}`)}>
                  <Text style={styles.tag}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.description}>{truncateText(item.description, maxDescriptionLength)}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.containerHome}>
      <FlatList
        data={testsList}
        renderItem={renderResultsItem}
        keyExtractor={(item) => item.name || 'resultsItem'}
        contentContainerStyle={styles.flatListContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default HomePageScreen;
