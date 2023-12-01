// App.js

import React, { useRef, useState, useEffect } from 'react';
import { ScrollView, Button, Text, View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TestsList } from './data/Tests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomePageScreen from './screens/HomePageScreen';
import ResultsScreen from './screens/ResultsScreen';
import QuizScreen from './screens/QuizScreen';
import WelcomeScreen from './screens/WelcomeScreen';
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
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(false);

  useEffect(() => {
    // Sprawdź, czy regulamin został zaakceptowany w AsyncStorage
    AsyncStorage.getItem('isRegulationAccepted').then((value) => {
      if (!value) {
        setShowWelcomeScreen(true);
      }
    });
  }, []);

  const handleAcceptanceToggle = async () => {
    // Zapisz stan zaakceptowania regulaminu w AsyncStorage
    await AsyncStorage.setItem('isRegulationAccepted', 'true');
    setShowWelcomeScreen(false);
  };

  return (
    <NavigationContainer>
      {false ? (
        <WelcomeScreen handleAcceptanceToggle={handleAcceptanceToggle} />
      ) : (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home Page" component={HomePageScreen} />
          <Drawer.Screen name="Results" component={ResultsScreen} />
          <Drawer.Screen name="Test" component={QuizScreen} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;