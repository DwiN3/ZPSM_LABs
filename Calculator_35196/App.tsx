import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
const math = require('mathjs');

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

  const power = (exponent: number | string) => {
    try {
      let result;
      if (exponent === 'y') {
        
      } else {
        result = Math.pow(parseFloat(displayText), exponent as number); 
      }
      
      if (result !== undefined) {
        setDisplayText(result.toString());
      } else {
        setDisplayText('Błąd obliczeń');
      }
    } catch (error) {
      setDisplayText('Błąd');
    }
  };
  
  const procent = () => {
    try {
      const currentText = eval(displayText);
      const finalResult = currentText / 100;
      setDisplayText(finalResult.toString());
    } catch (error) {
      setDisplayText('Błąd');
    }
  };

  const minus_plus = () => {
    const currentText = displayText;
    if (currentText[0] === '-') {
      setDisplayText(currentText.slice(1));
    } else {
      setDisplayText('-' + currentText);
    }
  };
  
  const factorial = () => {
    try {
      const currentText = displayText;
      const number = parseFloat(currentText);
  
      if (!isNaN(number) && Number.isInteger(number) && number >= 0) {
        const result = math.factorial(number);
        setDisplayText(result.toString());
      } else {
        setDisplayText('Błąd');
      }
    } catch (error) {
      setDisplayText('Błąd');
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
    Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={orientation === 'landscape' ? styles.displayLand : styles.display}>
      <Text style={styles.displayText}>{displayText}</Text>
</View>
      {orientation === 'portrait' ? (
        <View style={[styles.buttons, { flex: 4 }]}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.buttonClear, { flex: 3 }]} onPress={clearDisplay}>
              <Text style={styles.buttonText}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={() => handleButtonPress('/')}
            >
              <Text style={styles.buttonTextOperator}>/</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('7')}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('8')}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('9')}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={() => handleButtonPress('*')}
            >
              <Text style={styles.buttonTextOperator}>*</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('4')}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('5')}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('6')}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={() => handleButtonPress('-')}
            >
              <Text style={styles.buttonTextOperator}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('1')}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('2')}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('3')}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={() => handleButtonPress('+')}
            >
              <Text style={styles.buttonTextOperator}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.buttonZero} onPress={() => handleButtonPress('0')}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress(',')}>
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={calculateResult}
            >
              <Text style={styles.buttonTextOperator}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={[styles.buttons, { flex: 10 }]}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.moreButtons} onPress={() => handleButtonPress('(')}>
              <Text style={styles.moreTextButtons}>(</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={() => handleButtonPress(')')}>
              <Text style={styles.moreTextButtons}>)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>mc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>m+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>m-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>mr</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={minus_plus}>
              <Text style={styles.moreTextButtons}>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={procent}>
              <Text style={styles.moreTextButtons}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={() => handleButtonPress('/')}
            >
              <Text style={[styles.buttonTextOperator, { fontSize: 25 }]}>/</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>2nd</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={() => power(2)}>
              <Text style={styles.moreTextButtons}>x²</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={() => power(3)}>
              <Text style={styles.moreTextButtons}>x³</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={() => power('y')}>
              <Text style={styles.moreTextButtons}>x^y</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>e^x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>10^x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('7')}>
              <Text style={styles.moreTextButtons}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('8')}>
              <Text style={styles.moreTextButtons}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('9')}>
              <Text style={styles.moreTextButtons}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={() => handleButtonPress('*')}
            >
              <Text style={[styles.buttonTextOperator, { fontSize: 25 }]}>*</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>1/x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>√x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>³√x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>y√x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>log10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('4')}>
              <Text style={styles.moreTextButtons}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('5')}>
              <Text style={styles.moreTextButtons}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('6')}>
              <Text style={styles.moreTextButtons}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={() => handleButtonPress('-')}
            >
              <Text style={[styles.buttonTextOperator, { fontSize: 25 }]}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.moreButtons} onPress={silnia}>
              <Text style={styles.moreTextButtons}>x!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>sin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>con</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>tan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>e</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>EE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('1')}>
              <Text style={styles.moreTextButtons}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('2')}>
              <Text style={styles.moreTextButtons}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress('3')}>
              <Text style={styles.moreTextButtons}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={() => handleButtonPress('+')}
            >
              <Text style={[styles.buttonTextOperator, { fontSize: 25 }]}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
          <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>Rad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>sinh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>cosh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>tanh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>π</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>Rand</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonZero} onPress={() => handleButtonPress('0')}>
              <Text style={styles.moreTextButtons}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonNumber} onPress={() => handleButtonPress(',')}>
              <Text style={styles.moreTextButtons}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonOperator}
              onPress={calculateResult}
            >
              <Text style={[styles.buttonTextOperator, { fontSize: 25 }]}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
        )}
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
  displayLand: {
    flex: 3,
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
    backgroundColor: 'gray',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434343',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
  },
  buttonClear: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434343',
    backgroundColor: '#646466',
  },
  moreButtons: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434343',
    backgroundColor: '#646466',
  },
  buttonTextClear: {
    color: 'white',
    fontSize: 35,
  },
  moreTextButtons: {
    color: 'white',
    fontSize: 25,
  },
  buttonOperator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434343',
    backgroundColor: 'orange',
  },
  buttonTextOperator: {
    color: 'white',
    fontSize: 40,
  },
  buttonNumber: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434343',
    color: 'white',
    backgroundColor: '#7c7d7f',
  },
  buttonZero: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    fontSize: 35,
    borderColor: '#7c7d7f',
    backgroundColor: '#7c7d7f',
  }
});
export default App;
