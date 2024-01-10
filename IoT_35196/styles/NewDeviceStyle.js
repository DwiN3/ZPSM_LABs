import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 16,
      },
      input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
      },
      buttonContainer: {
        flexDirection: 'row', 
    justifyContent: 'space-between',
        width: 50,
        alignItems: 'center',  
        justifyContent: 'center',
      },
      button: {
        marginTop: 16,
        borderColor: 'black',
        borderWidth: 2,
        color: "black",
        width: "100%",
        height: 40, 
        fontWeight: "600",
      },
      buttonText: {
        color: 'white', 
        fontSize: 16,    
        fontWeight: 'bold', 
      }
      ,});

  export default styles;