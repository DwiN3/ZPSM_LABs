import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
  },
  itemContainer: {
    height: 170,
    width: 170,
    borderWidth: 2,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'yellow',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default styles;
