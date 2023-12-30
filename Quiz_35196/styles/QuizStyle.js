// QuizStyle.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerQuiz: {
    flex: 1,
    flexDirection: 'column',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
    height: 50, 
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
    marginTop: 5,
    height: 'auto', 
  },
  questionText: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionContainer: {
    height: 'auto',
  },
  descriptionText: {
    fontSize: 13,
    textAlign: 'justify',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 15,
  },
  answersContainer: {
    padding: 15,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 15,
  },
  answersButton: {
    backgroundColor: '#808080',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 3,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 85,
    width: 160,
  },
  answersButtonText: {
    fontSize: 15,
    
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    flexWrap: 'wrap',
  },
});

export default styles;
