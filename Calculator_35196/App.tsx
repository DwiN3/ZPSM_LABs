import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

const App = () => {
  const [displayText, setDisplayText] = useState('0');
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
  );

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
            <TouchableOpacity style={styles.buttonClear} onPress={clearDisplay}>
              <Text style={[styles.buttonTextClear, { flex: 3 }]}>AC</Text>
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
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>(</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
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
            <TouchableOpacity style={styles.buttonClear} onPress={clearDisplay}>
              <Text style={styles.buttonTextClear}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButtons} onPress={clearDisplay}>
              <Text style={styles.moreTextButtons}>%</Text>
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
