// functions.js
import { useState, useEffect } from 'react';
const math = require('mathjs');

// AC
export const clearDisplay = () => {
  setDisplayText('0');
};

// =
export const calculateResult = () => {
  try {
    const text = displayText;
    let result;

    if (text.includes("^")) {
      result = eval(text.replace(/\^/g, "**"));
    } else if (text.includes("√")) {
      const parts = text.split("√");
      if (parts.length === 2) {
        const degree = parseFloat(parts[0]);
        const operand = parseFloat(parts[1]);
        if (!isNaN(degree) && !isNaN(operand)) {
          result = Math.pow(operand, 1 / degree);
        }
      }
    } else {
      result = eval(text);
    }
    
    if (!isNaN(result)) {
      setDisplayText(result.toString());
    } else {
      setDisplayText('Błąd obliczeń');
    }
  } catch (error) {
    setDisplayText('Błąd');
  }
};



// ^
export const power = (exponent) => {
  try {
    let result;
    if (exponent === 'y') {
      setDisplayText(displayText.toString() + "^" );
    } else {
      const base = parseFloat(displayText);
      const exp = parseFloat(exponent);
      if (!isNaN(base) && !isNaN(exp)) {
        result = Math.pow(base, exp);
        if (!isNaN(result)) {
          setDisplayText(result.toString());
        } else {
          setDisplayText('Błąd obliczeń');
        }
      } else {
        setDisplayText('Błąd obliczeń');
      }
    }
  } catch (error) {
    setDisplayText('Błąd');
  }
};

// √
export const sqrt = (exponent) => {
  try {
    if (exponent === '√') {
      const x = parseFloat(displayText);
      if (!isNaN(x)) {
        const result = Math.sqrt(x);
        if (!isNaN(result)) {
          setDisplayText(result.toString());
        } else {
          setDisplayText('Błąd obliczeń');
        }
      }
    } else if (exponent === '³√') {
      const x = parseFloat(displayText);
      if (!isNaN(x)) {
        const result = Math.cbrt(x);
        if (!isNaN(result)) {
          setDisplayText(result.toString());
        } else {
          setDisplayText('Błąd obliczeń');
        }
      }
    } else if (exponent === 'y√x') {
      setDisplayText(displayText.toString() + "√");
    }
  } catch (error) {
    setDisplayText('Błąd');
  }
};

// %
export const procent = () => {
  try {
    const currentText = eval(displayText);
    const finalResult = currentText / 100;
    setDisplayText(finalResult.toString());
  } catch (error) {
    setDisplayText('Błąd');
  }
};

// +/-
export const minus_plus = () => {
  const currentText = displayText;
  if (currentText[0] === '-') {
    setDisplayText(currentText.slice(1));
  } else {
    setDisplayText('-' + currentText);
  }
};

// π
export const displayPi = () => {
  const piValue = Math.PI;
  setDisplayText(piValue.toString());
};

// ln
export const ln = () => {
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

// log10
export const log10 = () => {
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

// 1/x
export const reciprocal = () => {
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

// e
export const displayEuler = () => {
  const eValue = Math.E;
  setDisplayText(eValue.toString());
};

// E
export const scientificNotation = () => {
  const currentText = displayText;
  const numberValue = parseFloat(currentText);

  if (!isNaN(numberValue)) {
    const scientificValue = numberValue.toExponential();
    setDisplayText(scientificValue);
  } else {
    setDisplayText('Błąd: Nieprawidłowa notacja naukowa');
  }
};

// 10^x
export const powerOfTen = () => {
  try {
    const currentText = eval(displayText);
    const finalResult = Math.pow(10, currentText);
    setDisplayText(finalResult.toString());
  } catch (error) {
    setDisplayText('Błąd');
  }
};

// 2nd
export const power2nd = () => {
  try {
    const currentText = displayText;
    const number = parseFloat(currentText);

    if (!isNaN(number)) {
      const result = Math.pow(number, 2);
      setDisplayText(result.toString());
    } else {
      setDisplayText('Błąd obliczeń');
    }
  } catch (error) {
    setDisplayText('Błąd');
  }
};

// e^x
export const expPower = () => {
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

// Rad
export const degreesToRadians = () => {
  try {
    const currentText = eval(displayText);
    const radians = (currentText * Math.PI) / 180;
    setDisplayText(radians.toString());
  } catch (error) {
    setDisplayText('Błąd');
  }
};

// Rand
export const random = () => {
  const randomValue = Math.random();
  setDisplayText(randomValue.toString());
};

// Memory functions
const [memory, setMemory] = useState(0);

// m+
export const addToMemory = () => {
  try {
    const currentText = parseFloat(displayText);
    setMemory((prevMemory) => prevMemory + currentText);
    setDisplayText('0');
  } catch (error) {
    setDisplayText('Błąd');
  }
};
// m-
export const subtractFromMemory = () => {
  try {
    const currentText = parseFloat(displayText);
    setMemory((prevMemory) => prevMemory - currentText);
    setDisplayText('0');
  } catch (error) {
    setDisplayText('Błąd');
  }
};

// mr
export const recallFromMemory = () => {
  if (displayText === '0') {
    setDisplayText(memory.toString());
  } else {
    setDisplayText(displayText + memory.toString());
  }
};

// mc
export const clearMemory = () => {
  setMemory(0);
};

// !x
export const factorial = () => {
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
export const roundToTwoDecimalPlaces = () => {
  return Math.round(value * 100) / 100;
};

 // Trigonometric functions
export const toRadians = () => {
  return degrees * (Math.PI / 180);
};
export const trigFunction = (funcName) => {
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