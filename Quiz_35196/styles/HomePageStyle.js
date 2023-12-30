// HomePageStyle.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  testItem: {
    marginVertical: 10,
    padding: 15,
    width: '100%',
    height: 150, 
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  regularItem: {
    marginBottom: 10,
  },
  titleTest: {
    marginTop: -9,
    fontSize: 22,
    marginBottom: 5,
    fontWeight: 'bold',
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
  containerHome: {
    flex: 1,
    alignItems: 'center',
  },
  flatListContainer: {
    flexGrow: 1,
    padding: 20,
  },
});

export default styles;