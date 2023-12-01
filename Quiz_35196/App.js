// App.js

import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, Button, Text, View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TestsList } from './data/Tests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePageScreen from './screens/HomePageScreen';
import ResultsScreen from './screens/ResultsScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import QuizScreen from './screens/QuizScreen';
import styles from './styles/DrawerStyle';

const Drawer = createDrawerNavigator();

const DrawerContent = ({ navigation }) => {
  const renderTestButtons = () => {
    return TestsList.map((test, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate('Test', { test, titleTest: test.titleTest })}
      >
        <View style={styles.drawerButton}>
          <Text style={styles.drawerButtonText}>{test.titleTest}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.containerDrawer, styles.navigationContainer]}>
        <Text style={styles.drawerTitle}>Quiz App</Text>
        <Image source={require('./assets/icon_choose.png')} style={styles.drawerIcon} />
        <View style={styles.buttonContainer}>
          <Button title="Home Page" onPress={() => navigation.navigate('Home Page')} color="#808080" />
          <View style={styles.buttonSpacer} />
          <Button title="Results" onPress={() => navigation.navigate('Results')} color="#808080" />
          <Text style={styles.divider}></Text>
          {renderTestButtons()}
        </View>
      </View>
    </ScrollView>
  );
};

const App = () => {
  const drawer = useRef(null);
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);

  useEffect(() => {
    // Sprawdź, czy to pierwsze uruchomienie aplikacji
    checkFirstRun();
  }, []);

  const checkFirstRun = async () => {
    try {
      const value = await AsyncStorage.getItem('isRegulationAccepted');
      if (value !== null) {
        // Jeśli wartość istnieje w AsyncStorage, oznacza to, że to nie jest pierwsze uruchomienie
        setShowWelcomeScreen(false);
      }
    } catch (error) {
      console.error('Error checking first run status from AsyncStorage:', error);
    }
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        {showWelcomeScreen ? (
          <Drawer.Screen name="Welcome" component={WelcomeScreen} />
        ) : (
          <>
            <Drawer.Screen name="Home Page" component={HomePageScreen} />
            <Drawer.Screen name="Results" component={ResultsScreen} />
            <Drawer.Screen name="Test" component={QuizScreen} />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;