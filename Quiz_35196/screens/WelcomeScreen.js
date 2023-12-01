// WelcomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import styles from '../styles/WelcomeStyle.js';

const WelcomeScreen = ({ route, navigation }) => {
  const [isRegulationAccepted, setIsRegulationAccepted] = useState(false);

  useEffect(() => {
    checkRegulationStatus();
  }, []);

  const checkRegulationStatus = async () => {
    try {
      // Check if the regulation has been accepted before
      const storedStatus = await AsyncStorage.getItem('regulationAccepted');
      if (storedStatus !== null) {
        setIsRegulationAccepted(JSON.parse(storedStatus));
        // If regulation is accepted, navigate to Home Page directly
        if (JSON.parse(storedStatus)) {
          navigation.navigate('Home Page');
        }
      }
    } catch (error) {
      console.error('Error reading regulation status from AsyncStorage:', error);
    }
  };

  const handleAcceptanceToggle = () => {
    setIsRegulationAccepted(!isRegulationAccepted);
  };

  const handleContinuePress = async () => {
    if (isRegulationAccepted) {
      try {
        // Save the regulation acceptance status to AsyncStorage
        await AsyncStorage.setItem('regulationAccepted', JSON.stringify(true));
        navigation.navigate('Home Page');
      } catch (error) {
        console.error('Error saving regulation status to AsyncStorage:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.contentContainer}>
      <Text style={styles.label}>Aby korzystać z aplikacji musisz zaakceptować regulamin</Text>
      <TouchableOpacity onPress={handleAcceptanceToggle}>
        <View style={styles.checkboxContainer}>
          <View style={[styles.checkbox, isRegulationAccepted && styles.checkedBox]} />
          <Text>Akceptuje regulamin</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleContinuePress} disabled={!isRegulationAccepted}>
        <View style={[styles.continueButton, !isRegulationAccepted && styles.disabledButton]}>
          <Text>Dalej</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
  );
};

export default WelcomeScreen;
