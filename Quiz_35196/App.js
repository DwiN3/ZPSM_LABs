// App.js
import React, { useRef } from 'react';
import { ScrollView, Button, Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TestsList } from './data/Tests';
import styles from './QuizStyles'; 

const Drawer = createDrawerNavigator();

const HomePage = ({ navigation }) => {
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    } else {
      return text;
    }
  };

  const TestsListWithNewItem = [...TestsList, { specialItem: true }];

  const renderItem = ({ item }) => {
    if (item.specialItem) {
      // Render the special item with text and a button
      return (
        <View style={styles.specialItem}>
          <Text style={styles.specialItemText}>Get to know your ranking result</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Results')}>
            <View style={styles.specialItemButton}>
              <Text style={styles.specialItemButtonText}>Check!</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      // Render regular test item with padding
      return (
        <TouchableOpacity onPress={() => navigation.navigate('Test', { test: item })}>
          <View style={[styles.testItem, styles.regularItem]}>
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
    }
  };

  return (
    <View style={styles.containerHome}>
      <FlatList
        data={TestsListWithNewItem}
        renderItem={renderItem}
        keyExtractor={(item) => item.titleTest || 'specialItem'}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
};

const Results = ({ navigation }) => (
  <View style={styles.containerResults}>
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
          <Text style={styles.divider}></Text>
          {renderTestButtons()}
        </View>
      </View>
    </ScrollView>
  );
};

const Test = ({ route }) => {
  const { test } = route.params;
  return (
    <View style={styles.containerDrawer}>
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

export default App;