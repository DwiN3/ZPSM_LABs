// Quizstyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Results
  containerResults: {
    flex: 1,
    alignItems: 'center',
  },
  centeredText: {
    fontSize: 18,
    textAlign: 'center',
  },
  // Drawer
  navigationContainer: {
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  containerDrawer: {
    flex: 1,
    alignItems: 'center',
  },
  drawerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  drawerIcon: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 15,
    width: '100%', 
    flexDirection: 'column',
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 4,
  },
  drawerButton: {
    backgroundColor: '#808080',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 2,
  },
  drawerButtonText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  buttonSpacer: {
    marginVertical: 10, 
  },
  scrollContainer: {
    flexGrow: 1,
  },
  // Home page
  testItem: {
    marginVertical: 10,
    padding: 15,
    width: '100%',
    height: 150, 
    borderWidth: 3,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  titleTest: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
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
  regularItem: {
    marginBottom: 10,
  },
  specialItem: {
    width: '111%',
    height: 120,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: -14,
    marginLeft: -21, 
    marginRight: -10, 
  },
  specialItemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialItemButton: {
    backgroundColor: 'grey',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: 2,
  },
  specialItemButtonText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
});

export default styles;