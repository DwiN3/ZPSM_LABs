import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { clearDisplay, calculateResult, power, sqrt, procent, minus_plus, displayPi, ln, log10, reciprocal, displayEuler, scientificNotation, powerOfTen, power2nd, expPower, degreesToRadians, random, addToMemory, subtractFromMemory, recallFromMemory, clearMemory, factorial, trigFunction} from './CalculatorFunction';

const App = () => {
  const [displayText, setDisplayText] = useState('0');
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
  );

  const handleButtonPress = (buttonValue) => {
    if (displayText === '0' && /[0-9]/.test(buttonValue)) {
      setDisplayText(buttonValue);
    } else {
      setDisplayText((prevText) => {
        if (prevText === '0' && buttonValue === '(') {
          return buttonValue;
        } else {
          return prevText + buttonValue;
        }
      });
    }
  };

  const handleOrientationChange = () => {
    const { width, height } = Dimensions.get('window');
    if (width > height) {
      setOrientation('landscape');
    } else {
      setOrientation('portrait');
    }
  };

  useEffect(() => {
    if(Platform.OS=== 'android') SplashScreen.hide();
    
    Dimensions.addEventListener('change', handleOrientationChange);
    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  const buttonsPortrait = [
    { title: 'AC', onPress: clearDisplay, style: styles.buttonSpecial },
    { title: '', style: styles.buttonSpecial },
    { title: '', style: styles.buttonSpecial },
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
    { title: '0', onPress: () => handleButtonPress('0'), style: [ styles.buttonNumber, { flex: 2 }]},
    { title: '.', onPress: () => handleButtonPress('.'), style: styles.buttonNumber },
    { title: '=', onPress: calculateResult, style: styles.buttonOperator },
  ];

  const buttonsLand = [
    { title: '(', onPress: () => handleButtonPress('('), style: styles.buttonSpecial },
    { title: ')', onPress: () => handleButtonPress(')'), style: styles.buttonSpecial },
    { title: 'mc', onPress: () => clearMemory(), style: styles.buttonSpecial },
    { title: 'm+', onPress: () => addToMemory(), style: styles.buttonSpecial },
    { title: 'm-', onPress: () => subtractFromMemory(), style: styles.buttonSpecial },
    { title: 'mr', onPress: () => recallFromMemory(), style: styles.buttonSpecial },
    { title: 'AC', onPress: () => clearDisplay(), style: styles.buttonSpecial },
    { title: '+/-', onPress: () => minus_plus(), style: styles.buttonSpecial },
    { title: '%', onPress: () => procent(), style: styles.buttonSpecial },
    { title: '/', onPress: () => handleButtonPress('/'), style: styles.buttonSpecial },

    { title: '2nd', onPress: () => power2nd(), style: styles.buttonSpecial },
    { title: 'x²', onPress: () => power(2), style: styles.buttonSpecial },
    { title: 'x³', onPress: () => power(3), style: styles.buttonSpecial },
    { title: 'x^y', onPress: () => power('y'), style: styles.buttonSpecial },
    { title: 'e^x', onPress: () => expPower(), style: styles.buttonSpecial },
    { title: '10^x', onPress: () => powerOfTen(), style: styles.buttonSpecial },
    { title: '7', onPress: () => handleButtonPress('7'), style: styles.buttonNumber },
    { title: '8', onPress: () => handleButtonPress('8'), style: styles.buttonNumber },
    { title: '9', onPress: () => handleButtonPress('9'), style: styles.buttonNumber },
    { title: '*', onPress: () => handleButtonPress('*'), style: styles.buttonOperator },

    { title: '1/x', onPress: () => reciprocal(), style: styles.buttonSpecial },
    { title: '√x', onPress: () => sqrt('√'), style: styles.buttonSpecial },
    { title: '³√x', onPress: () => sqrt('³√'), style: styles.buttonSpecial },
    { title: 'y√x', onPress: () => sqrt('y√x'), style: styles.buttonSpecial },
    { title: 'In', onPress: () => ln(), style: styles.buttonSpecial },
    { title: 'log10', onPress: () => log10(), style: styles.buttonSpecial },
    { title: '4', onPress: () => handleButtonPress('4'), style: styles.buttonNumber },
    { title: '5', onPress: () => handleButtonPress('5'), style: styles.buttonNumber },
    { title: '6', onPress: () => handleButtonPress('6'), style: styles.buttonNumber },
    { title: '-', onPress: () => handleButtonPress('-'), style: styles.buttonOperator },

    { title: 'x!', onPress: () => factorial(), style: styles.buttonSpecial },
    { title: 'sin', onPress: () => trigFunction('sin'), style: styles.buttonSpecial },
    { title: 'cos', onPress: () => trigFunction('cos'), style: styles.buttonSpecial },
    { title: 'tan', onPress: () => trigFunction('tan'), style: styles.buttonSpecial },
    { title: 'e', onPress: () => displayEuler(), style: styles.buttonSpecial },
    { title: 'EE', onPress: () => scientificNotation(), style: styles.buttonSpecial },
    { title: '1', onPress: () => handleButtonPress('1'), style: styles.buttonNumber },
    { title: '2', onPress: () => handleButtonPress('2'), style: styles.buttonNumber },
    { title: '3', onPress: () => handleButtonPress('3'), style: styles.buttonNumber },
    { title: '+', onPress: () => handleButtonPress('+'), style: styles.buttonOperator },

    { title: 'Rad', onPress: () => degreesToRadians(), style: styles.buttonSpecial },
    { title: 'sinh', onPress: () => trigFunction('sinh'), style: styles.buttonSpecial },
    { title: 'cosh', onPress: () => trigFunction('cosh'), style: styles.buttonSpecial },
    { title: 'tanh', onPress: () => trigFunction('tanh'), style: styles.buttonSpecial },
    { title: 'π', onPress: () => displayPi(), style: styles.buttonSpecial },
    { title: 'Rand', onPress: () => random(), style:[ styles.buttonSpecial, { flex:1 } ]},
    { title: '0', onPress: () => handleButtonPress('0'), style: [styles.buttonNumber, { flex: 2 }],},
    { title: '.', onPress: () => handleButtonPress('.'), style: styles.buttonNumber },
    { title: '=', onPress: () => calculateResult(), style: styles.buttonOperator },
  ];
  const buttonsToRender = orientation === 'landscape' ? buttonsLand : buttonsPortrait;
  const sliceCount = orientation === 'landscape' ? 10 : 4;
  const sizeFont = orientation === 'landscape'
  ? { ...styles.buttonText, fontSize: 15 }
  : { ...styles.buttonText, fontSize: 35 };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{displayText}</Text>
      </View>
      <View style={styles.buttons}>
        {[0, 1, 2, 3, 4].map((row) => (
          <View key={row} style={styles.row}>
            {buttonsToRender.slice(row * sliceCount, (row + 1) * sliceCount).map((button, index) => (
              <TouchableOpacity
                key={index}
                style={button.style}
                onPress={button.onPress}
              >
                <Text style={sizeFont}>{button.title}</Text>
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
    fontSize: 10,
    paddingVertical: 20,
    textAlign: 'center',
  },
  buttonSpecial: {
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
});

export default App;
