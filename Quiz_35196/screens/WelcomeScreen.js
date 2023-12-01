import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useNavigation } from '@react-navigation/native';  // Dodaj import hooka
import styles from '../styles/WelcomeStyle.js';

const WelcomeScreen = ({ onRegulationAccepted }) => {
  const navigation = useNavigation();  // Wykorzystaj hook do uzyskania dostępu do navigation

  const [isRegulationAccepted, setIsRegulationAccepted] = useState(false);

  useEffect(() => {
    // Check if navigation is available
    if (!navigation) {
      console.warn("Navigation prop is not available in WelcomeScreen.");
    }
  }, [navigation]);  // Dodaj navigation do zależności useEffect

  const handleAcceptanceToggle = () => {
    setIsRegulationAccepted(!isRegulationAccepted);
  };

  const handleContinuePress = async () => {
    if (isRegulationAccepted) {
      // If the regulation is accepted, call the provided callback
      await onRegulationAccepted();

      // Check if navigation is available before navigating
      if (navigation) {
        navigation.navigate('Home Page');
      } else {
        console.warn("Navigation prop is not available in WelcomeScreen.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>Aby korzystać z aplikacji, musisz zaakceptować regulamin</Text>
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
