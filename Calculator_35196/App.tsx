import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const App = () => {
  const [displayText, setDisplayText] = useState('0');

  const handleButtonPress = (buttonValue) => {
    if (displayText === '0' && /[0-9]/.test(buttonValue)) {
      setDisplayText(buttonValue);
    } else {
      setDisplayText((prevText) => prevText + buttonValue);
    }
  };

  const clearDisplay = () => {
    setDisplayText('0');
  };

  const calculateResult = () => {
    try {
      const result = eval(displayText);
      setDisplayText(result.toString());
    } catch (error) {
      setDisplayText('Błąd');
    }
  };

  const buttons = [
    { title: 'AC', onPress: clearDisplay, style: styles.buttonClear },
    { title: '', style: styles.buttonClear },
    { title: '', style: styles.buttonClear },
    { title: '/', onPress: () => handleButtonPress('/'), style: styles.buttonOperator },
    { title: '7', onPress: () => handleButtonPress('7'), style: styles.buttonNumber },
    { title: '8', onPress: () => handleButtonPress('8'), style: styles.buttonNumber },
    { title: '9', onPress: () => handleButtonPress('9'), style: styles.buttonNumber },
    { title: '*', onPress: () => handleButtonPress('*'), style: styles.buttonOperator },
    { title: '4', onPress: () => handleButtonPress('4'), style: styles.buttonNumber },
    { title: '5', onPress: () => handleButtonPress('5'), style: styles.buttonNumber },
    { title: '6', onPress: () => handleButtonPress('6'), style: styles.buttonNumber },
    { title: '-', onPress: () => handleButtonPress('-'), style: styles.buttonOperator },
    { title: '1', onPress: () => handleButtonPress('1'), style: styles.buttonNumber },
    { title: '2', onPress: () => handleButtonPress('2'), style: styles.buttonNumber },
    { title: '3', onPress: () => handleButtonPress('3'), style: styles.buttonNumber },
    { title: '+', onPress: () => handleButtonPress('+'), style: styles.buttonOperator },
    { title: '0', onPress: () => handleButtonPress('0'), style: [ styles.buttonZero, { flex: 2 }]},
    { title: '.', onPress: () => handleButtonPress('.'), style: styles.buttonNumber },
    { title: '=', onPress: calculateResult, style: styles.buttonOperator },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{displayText}</Text>
      </View>
      <View style={styles.buttons}>
        {[0, 1, 2, 3, 4].map((row) => (
          <View key={row} style={styles.row}>
            {buttons.slice(row * 4, (row + 1) * 4).map((button, index) => (
              <TouchableOpacity
                key={index}
                style={button.style}
                onPress={button.onPress}
              >
                <Text style={styles.buttonText}>{button.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#535457',
  },
  display: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#535457',
    padding: 10,
  },
  displayText: {
    fontSize: 65,
    color: 'white',
  },
  buttons: {
    flex: 4,
    flexDirection: 'column',
  },
  row: {
    flex: 2,
    flexDirection: 'row',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
    paddingVertical: 20,
    textAlign: 'center',
  },
  buttonClear: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#434343',
    backgroundColor: '#646466',
  },
  buttonOperator: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#434343',
    backgroundColor: 'orange',
  },
  buttonNumber: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#434343',
    color: 'white',
    backgroundColor: '#7c7d7f',
  },
  buttonZero: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#7c7d7f',
    backgroundColor: '#7c7d7f',
  },
});

export default App;
