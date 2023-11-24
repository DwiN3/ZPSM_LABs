import React, { useRef } from 'react';
import { ScrollView, Button, Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
    <TouchableOpacity onPress={() => navigation.navigate('Test', { test: item })}>
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

const DrawerContent = ({ navigation }) => {
  const renderTestButtons = () => {
    return TestsList.map((test, index) => (
      <TouchableOpacity key={index} onPress={() => navigation.navigate('Test', { test })}>
        <View style={styles.drawerButton}>
          <Text style={styles.drawerButtonText}>{test.titleTest}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[styles.container, styles.navigationContainer]}>
        <Text style={styles.drawerTitle}>Quiz App</Text>
        <Image source={require('./assets/icon_choose.png')} style={styles.drawerIcon} />
        <View style={styles.buttonContainer}>
          <Button title="Home Page" onPress={() => navigation.navigate('Home Page')} color="#808080" />
          <View style={styles.buttonSpacer} />
          <Button title="Results" onPress={() => navigation.navigate('Results')} color="#808080" />
          <View style={styles.buttonSpacer} />
          {renderTestButtons()}
        </View>
      </View>
    </ScrollView>
  );
};

const Test = ({ route }) => {
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
  const drawer = useRef(null);

  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="Home Page" component={HomePage} />
        <Drawer.Screen name="Results" component={Results} />
        <Drawer.Screen name="Test" component={Test} />
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
  scrollContainer: {
    flexGrow: 1,
  },
});

export default App;