// App.js

import React, { useEffect, useRef } from 'react';
import { ScrollView, Button, Text, View, Image, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TestsList } from './data/Tests';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import WelcomeScreen from './screens/WelcomeScreen';
import HomePageScreen from './screens/HomePageScreen';
import ResultsScreen from './screens/ResultsScreen';
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
  const [initialLaunch, setInitialLaunch] = React.useState(null);

  useEffect(() => {
    checkInitialLaunch();
  }, []);

  const checkInitialLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        setInitialLaunch(true);
      } else {
        setInitialLaunch(false);
      }
    } catch (error) {
      console.error('Error checking initial launch:', error);
    }
  };

  const handleInitialLaunch = async () => {
    try {
      await AsyncStorage.setItem('hasLaunched', 'true');
      setInitialLaunch(false);
    } catch (error) {
      console.error('Error setting initial launch:', error);
    }
  };

  if (initialLaunch === null) {
    return null;
  }

  return (
    <NavigationContainer>
<<<<<<< Updated upstream
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        {initialLaunch ? (
          <Drawer.Screen
            name="Welcome"
            component={WelcomeScreen}
            initialParams={{ handleInitialLaunch: true }} // Replace with serializable data
          />
        ) : (
          <>
            <Drawer.Screen name="Home Page" component={HomePageScreen} />
            <Drawer.Screen name="Results" component={ResultsScreen} />
            <Drawer.Screen name="Test" component={QuizScreen} />
          </>
        )}
      </Drawer.Navigator>
=======
      {true ? (
        <WelcomeScreen onRegulationAccepted={handleRegulationAccepted} />
      ) : (
        <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
          <Drawer.Screen name="Home Page" component={HomePageScreen} />
          <Drawer.Screen name="Results" component={ResultsScreen} />
          <Drawer.Screen name="Test" component={QuizScreen} />
        </Drawer.Navigator>
      )}
>>>>>>> Stashed changes
    </NavigationContainer>
  );
};

export default App;