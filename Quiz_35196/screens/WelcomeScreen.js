import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/WelcomeStyle.js';

const WelcomeScreen = ({ navigation }) => {
  const [isRegulationAccepted, setIsRegulationAccepted] = useState(false);

  useEffect(() => {
    // Sprawdź, czy regulamin został już zaakceptowany
    checkRegulationAcceptance();
  }, []);

  const checkRegulationAcceptance = async () => {
    try {
      const value = await AsyncStorage.getItem('isRegulationAccepted');
      if (value !== null) {
        // Jeśli wartość istnieje w AsyncStorage, oznacza to, że regulamin został już zaakceptowany
        setIsRegulationAccepted(true);
      }
    } catch (error) {
      console.error('Error reading regulation acceptance status from AsyncStorage:', error);
    }
  };

  const handleAcceptanceToggle = async () => {
    try {
      // Zapisz informację o zaakceptowaniu regulaminu w AsyncStorage
      await AsyncStorage.setItem('isRegulationAccepted', 'true');
      setIsRegulationAccepted(true);
    } catch (error) {
      console.error('Error saving regulation acceptance status to AsyncStorage:', error);
    }
  };

  const handleContinuePress = () => {
    // Przejdź do głównej części aplikacji po zaakceptowaniu regulaminu
    navigation.navigate('Home Page');
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Aby korzystać z aplikacji musisz zaakceptować regulamin</Text>
        <TouchableOpacity onPress={handleAcceptanceToggle}>
          <View style={styles.checkboxContainer}>
            <View style={[styles.checkbox, isRegulationAccepted && styles.checkedBox]} />
            <Text>Akceptuję regulamin</Text>
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
