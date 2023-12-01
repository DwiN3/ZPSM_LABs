// WelcomeScreen

import styles from '../styles/WelcomeStyle.js';
import { View, Text, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ handleAcceptanceToggle }) => (
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
  
  export default WelcomeScreen;