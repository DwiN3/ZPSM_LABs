// WelcomeScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/WelcomeStyle.js';

const WelcomeScreen = ({ navigation }) => {
  const [isRegulationAccepted, setIsRegulationAccepted] = useState(false);

  const handleAcceptanceToggle = () => {
    setIsRegulationAccepted(!isRegulationAccepted);
  };

  const handleContinuePress = () => {
    if (isRegulationAccepted) {
      navigation.navigate('Home Page');
    }
  };

  return (
    <View contentContainer={styles.container}>
      <Text>Aby korzystać z aplikacji musisz zaznaczyć regulamin</Text>
      <TouchableOpacity onPress={handleAcceptanceToggle}>
        <View style={[styles.checkbox, isRegulationAccepted && styles.checkedBox]} />
        <Text>Akceptuje regulamin</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleContinuePress} disabled={!isRegulationAccepted}>
        <View style={[styles.continueButton, !isRegulationAccepted && styles.disabledButton]}>
          <Text>Dalej</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
