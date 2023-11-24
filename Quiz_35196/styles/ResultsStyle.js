// ResultsStyle.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  scrollContainer: {
    
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  header: {
    backgroundColor: '#808080',
  },
  evenRow: {
    backgroundColor: '#fff', // biały kolor tła
  },
  oddRow: {
    backgroundColor: '#f2f2f2', // jasno szary kolor tła
  },
  cell: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
  },
});

export default styles;