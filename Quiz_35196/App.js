import React from 'react';
import { Button, Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TestsList } from './data/Tests';

const Drawer = createDrawerNavigator();

const HomePage = ({ navigation }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    } else {
      return text;
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('TestDetails', { test: item })}>
      <View style={styles.testItem}>
        <Text style={styles.titleTest}>{item.titleTest}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (
            <TouchableOpacity key={index} onPress={() => console.log(`Pressed ${tag}`)}>
              <Text style={styles.tag}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.description}>{truncateText(item.description, 100)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={TestsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.titleTest}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};


const Results = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.centeredText}>Results</Text>
  </View>
);

const DrawerContent = ({ navigation }) => (
  <DrawerContentScrollView style={styles.navigationContainer}>
    <View style={styles.drawerContent}>
      <Text style={styles.drawerTitle}>Quiz App</Text>
      <Image source={require('./assets/icon_choose.png')} style={styles.drawerIcon} />
      <DrawerItem
        label="Home Page"
        onPress={() => navigation.navigate('Home Page')}
        labelStyle={styles.drawerItem}
      />
      <DrawerItem
        label="Results"
        onPress={() => navigation.navigate('Results')}
        labelStyle={styles.drawerItem}
      />
    </View>
  </DrawerContentScrollView>
);

const TestDetails = ({ route }) => {
  const { test } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.centeredText}>{test.titleTest}</Text>
      <View style={styles.tagsContainer}>
        {test.tags.map((tag, index) => (
          <TouchableOpacity key={index} onPress={() => console.log(`Pressed ${tag}`)}>
            <Text style={styles.tag}>{tag}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.description}>{test.description}</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home Page" component={HomePage} />
        <Drawer.Screen name="Results" component={Results} />
        <Drawer.Screen name="TestDetails" component={TestDetails} />
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
  flatListContainer: {
    flexGrow: 1,
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
  testItem: {
    marginVertical: 10,
    padding: 15,
    width: '100%', // Zmiana szerokości na 100%
    height: 150, // Ustawienie stałej wysokości
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
  drawerContent: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ecf0f1',
  },
  drawerItem: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
    textAlign: 'center',
    backgroundColor: '#808080',
    paddingVertical: 15,  // Increase vertical padding for a wider button
    borderRadius: 5,
    width: '100%',  // Set the width of the button
    alignSelf: 'center',  // Center the button
  },
});

export default App;