// Quizstyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerDrawer: {
    flex: 1,
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 18,
    textAlign: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  tag: {
    fontSize: 14,
    marginRight: 5,
    color: 'blue',
  },
  description: {
    marginTop: 11,
    fontSize: 14,
  },
});

export default styles;