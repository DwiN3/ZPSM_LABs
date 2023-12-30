// ResultsStyle.js

import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
  scrollContainer: {
    padding: 0,
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
    backgroundColor: '#fff',
  },
  headerCell: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    padding: 8, 
  },
  cell: {
    flex: 1,
    color: 'black',
    textAlign: 'center',
    padding: 8, 
  },
});

export default styles;
