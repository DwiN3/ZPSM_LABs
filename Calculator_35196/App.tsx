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

  const ac = () => {
    setDisplayText('0');
  };

  const wynik = () => {
    try {
      const result = eval(displayText);
      setDisplayText(result.toString());
    } catch (error) {
      setDisplayText('Błąd');
    }
  };
  
  const proc = () => {
    try {
      const currentText = eval(displayText);
      const finalResult = currentText / 100;
      setDisplayText(finalResult.toString());
    } catch (error) {
      setDisplayText('Błąd');
    }
  };

  const plus_and_min = () => {
    const currentText = displayText;
    if (currentText[0] === '-') {
      setDisplayText(currentText.slice(1));
    } else {
      setDisplayText('-' + currentText);
    }
  };

  const Pi = () => {
    const piValue = Math.PI;
    setDisplayText(piValue.toString());
  };
  
  const LN = () => {
    try {
      const currentText = eval(displayText);
      if (currentText <= 0) {
        setDisplayText('Błąd: ln z liczby nieujemnej');
      } else {
        const finalResult = Math.log(currentText);
        setDisplayText(finalResult.toString());
      }
    } catch (error) {
      setDisplayText('Błąd');
    }
  };

  const log10 = () => {
    try {
      const currentText = eval(displayText);
      if (currentText <= 0) {
        setDisplayText('Błąd: log10 z liczby nieujemnej');
      } else {
        const finalResult = Math.log10(currentText);
        setDisplayText(finalResult.toString());
      }
    } catch (error) {
      setDisplayText('Błąd');
    }
  };
  
  const reciprocal = () => {
    try {
      const currentText = eval(displayText);
      if (currentText === 0) {
        setDisplayText('Błąd: Nie można obliczyć odwrotności z liczby zero');
      } else {
        const finalResult = 1 / currentText;
        setDisplayText(finalResult.toString());
      }
    } catch (error) {
      setDisplayText('Błąd');
    }
  };

  const pow10 = () => {
    try {
      const currentText = eval(displayText);
      const finalResult = Math.pow(10, currentText);
      setDisplayText(finalResult.toString());
    } catch (error) {
      setDisplayText('Błąd');
    }
  };

  const exp = () => {
    try {
      const currentText = displayText;
      const number = parseFloat(currentText);
  
      if (!isNaN(number)) {
        const result = Math.exp(number);
        setDisplayText(result.toString());
      } else {
        setDisplayText('Błąd obliczeń');
      }
    } catch (error) {
      setDisplayText('Błąd');
    }
  };
  
  const radians = () => {
    try {
      const currentText = eval(displayText);
      const radians = (currentText * Math.PI) / 180;
      setDisplayText(radians.toString());
    } catch (error) {
      setDisplayText('Błąd');
    }
  };

  const ran = () => {
    const randomValue = Math.random();
    setDisplayText(randomValue.toString());
  };
  

  const silnia = () => {
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
  const roundToTwoDecimalPlaces = (value: number) => {
    return Math.round(value * 100) / 100;
  };
  
  const toRadians = (degrees: number) => {
    return degrees * (Math.PI / 180);
  };
  const trigFunction = (funcName: string) => {
    try {
      let result;
      const degrees = parseFloat(displayText);
      if (!isNaN(degrees)) {
        const radians = toRadians(degrees);
        switch (funcName) {
          case 'sin':
            result = Math.sin(radians);
            break;
          case 'cos':
            result = Math.cos(radians);
            break;
          case 'tan':
            result = Math.tan(radians);
            break;
          case 'sinh':
            result = Math.sinh(radians);
            break;
          case 'cosh':
            result = Math.cosh(radians);
            break;
          case 'tanh':
            result = Math.tanh(radians);
            break;
          default:
            break;
        }
      }
  
      if (result !== undefined) {
        setDisplayText(roundToTwoDecimalPlaces(result).toString());
      } else {
        setDisplayText('Błąd obliczeń');
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
      <View style={orientation === 'landscape' ? styles.dpL : styles.dp}>
      <Text style={styles.dpText}>{displayText}</Text>
</View>
      {orientation === 'portrait' ? (
        <View style={[styles.buttons, { flex: 4 }]}>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.clear, { flex: 3 }]} onPress={ac}>
              <Text style={styles.buttonText}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={() => handleButtonPress('/')}
            >
              <Text style={styles.opText}>/</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('7')}>
              <Text style={styles.buttonText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('8')}>
              <Text style={styles.buttonText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('9')}>
              <Text style={styles.buttonText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={() => handleButtonPress('*')}
            >
              <Text style={styles.opText}>*</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('4')}>
              <Text style={styles.buttonText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('5')}>
              <Text style={styles.buttonText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('6')}>
              <Text style={styles.buttonText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={() => handleButtonPress('-')}
            >
              <Text style={styles.opText}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('1')}>
              <Text style={styles.buttonText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('2')}>
              <Text style={styles.buttonText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('3')}>
              <Text style={styles.buttonText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={() => handleButtonPress('+')}
            >
              <Text style={styles.opText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.zero} onPress={() => handleButtonPress('0')}>
              <Text style={styles.buttonText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('.')}>
              <Text style={styles.buttonText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={wynik}
            >
              <Text style={styles.opText}>=</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={[styles.buttons, { flex: 10 }]}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.butt} onPress={() => handleButtonPress('(')}>
              <Text style={styles.buttText}>(</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => handleButtonPress(')')}>
              <Text style={styles.buttText}>)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={ac}>
              <Text style={styles.buttText}>mc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={ac}>
              <Text style={styles.buttText}>m+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={ac}>
              <Text style={styles.buttText}>m-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={ac}>
              <Text style={styles.buttText}>mr</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={ac}>
              <Text style={styles.buttText}>AC</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={plus_and_min}>
              <Text style={styles.buttText}>+/-</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={proc}>
              <Text style={styles.buttText}>%</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={() => handleButtonPress('/')}
            >
              <Text style={[styles.opText, { fontSize: 25 }]}>/</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.butt} onPress={ac}>
              <Text style={styles.buttText}>2nd</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => ac}>
              <Text style={styles.buttText}>x²</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => ac}>
              <Text style={styles.buttText}>x³</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => ac}>
              <Text style={styles.buttText}>x^y</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={exp}>
              <Text style={styles.buttText}>e^x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={pow10}>
              <Text style={styles.buttText}>10^x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('7')}>
              <Text style={styles.buttText}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('8')}>
              <Text style={styles.buttText}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('9')}>
              <Text style={styles.buttText}>9</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={() => handleButtonPress('*')}
            >
              <Text style={[styles.opText, { fontSize: 25 }]}>*</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.butt} onPress={reciprocal}>
              <Text style={styles.buttText}>1/x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => ac}>
  <Text style={styles.buttText}>√x</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.butt} onPress={() => ac}>
  <Text style={styles.buttText}>³√x</Text>
 </TouchableOpacity>

            <TouchableOpacity style={styles.butt} onPress={() => ac}>
              <Text style={styles.buttText}>y√x</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={LN}>
              <Text style={styles.buttText}>In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={log10}>
              <Text style={styles.buttText}>log10</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('4')}>
              <Text style={styles.buttText}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('5')}>
              <Text style={styles.buttText}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('6')}>
              <Text style={styles.buttText}>6</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={() => handleButtonPress('-')}
            >
              <Text style={[styles.opText, { fontSize: 25 }]}>-</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity style={styles.butt} onPress={silnia}>
              <Text style={styles.buttText}>x!</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => trigFunction('sin')}>
              <Text style={styles.buttText}>sin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => trigFunction('cos')}>
              <Text style={styles.buttText}>cos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => trigFunction('tan')}>
              <Text style={styles.buttText}>tan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={ac}>
              <Text style={styles.buttText}>e</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={ac}>
              <Text style={styles.buttText}>EE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('1')}>
              <Text style={styles.buttText}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('2')}>
              <Text style={styles.buttText}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress('3')}>
              <Text style={styles.buttText}>3</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={() => handleButtonPress('+')}
            >
              <Text style={[styles.opText, { fontSize: 24 }]}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
          <TouchableOpacity style={styles.butt} onPress={radians}>
              <Text style={styles.buttText}>Rad</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => trigFunction('sinh')}>
              <Text style={styles.buttText}>sinh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => trigFunction('cosh')}>
              <Text style={styles.buttText}>cosh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={() => trigFunction('tanh')}>
              <Text style={styles.buttText}>tanh</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={Pi}>
              <Text style={styles.buttText}>π</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.butt} onPress={ran}>
              <Text style={styles.buttText}>Rand</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.zero} onPress={() => handleButtonPress('0')}>
              <Text style={styles.buttText}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.number} onPress={() => handleButtonPress(',')}>
              <Text style={styles.buttText}>.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.op}
              onPress={wynik}
            >
              <Text style={[styles.opText, { fontSize: 23 }]}>=</Text>
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
  dp: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#535457',
    padding: 10,
  },
  dpL: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#535457',
    padding: 10,
  },
  dpText: {
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
  clear: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434343',
    backgroundColor: '#646466',
  },
  butt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434343',
    backgroundColor: '#646466',
  },
  clearText: {
    color: 'white',
    fontSize: 35,
  },
  buttText: {
    color: 'white',
    fontSize: 25,
  },
  op: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434343',
    backgroundColor: 'orange',
  },
  opText: {
    color: 'white',
    fontSize: 40,
  },
  number: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#434343',
    color: 'white',
    backgroundColor: '#7c7d7f',
  },
  zero: {
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
