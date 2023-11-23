import React, { useRef } from 'react';
import { Button, Text, View, StyleSheet, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const HomeScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.centeredText}>Home Page</Text>
  </View>
);

const Results = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.centeredText}>Results</Text>
  </View>
);

const DrawerContent = ({ navigation }) => (
  <View style={[styles.container, styles.navigationContainer]}>
    <Text style={styles.drawerTitle}>Quiz App</Text>
    <Image
      source={require('./assets/icon_choose.png')}
      style={styles.drawerIcon}
    />
    <View style={styles.buttonContainer}>
      <Button
        title="Home Page"
        onPress={() => navigation.navigate('Home Screen')}
        color="#808080" // Szare tło przycisku
      />
      <View style={styles.buttonSpacer} />
      <Button
        title="Results"
        onPress={() => navigation.navigate('Results')}
        color="#808080" // Szare tło przycisku
      />
    </View>
  </View>
);

const App = () => {
  const drawer = useRef(null);

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home Screen" component={HomeScreen} />
        <Drawer.Screen name="Results" component={Results} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
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
  centeredText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 15,
    width: '100%', 
    flexDirection: 'column',
  },
  buttonSpacer: {
    marginVertical: 10, 
  },
});

export default App;