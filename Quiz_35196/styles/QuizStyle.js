// QuizStyle.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerQuiz: {
    flex: 1,
    flexDirection: 'column',
  },
  textContainer: {
    backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    height: 50, // Fixed height
  },
  questionNumbersText: {
    marginTop: 25,
    marginLeft: 25,
    fontSize: 18,
  },
  timeText: {
    marginTop: 25,
    marginRight: 25,
    fontSize: 18,
  },
  questionContainer: {
    backgroundColor: 'yellow',
    height: 150, // Fixed height
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionText: {
    marginTop: 10,
    fontSize: 13,
    textAlign: 'center',
  },
  answersContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 3,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: "red",
    height: 180, // Fixed height
  },
  answersButton: {
    backgroundColor: '#808080',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 3,
    padding: 10,
    margin: 15,
    alignItems: 'center',
    height: 40, // Fixed height
  },
  answersButtonText: {
    fontSize: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default styles;
