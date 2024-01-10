import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/NewDeviceStyle';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import { devices, devicesList } from '../data/devices';

const NewDeviceScreen = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [command, setCommand] = useState('');
  const Colors = ["blue", "yellow", "pink", "red", "green", "purple", "orange"];
  const [color, setColor] = useState(Colors[0]);

  const navigation = useNavigation();

  const handleSave = async () => {
    const newDevice = new devices(
      (devicesList.length + 1).toString(),
      name,
      place,
      command,
      color
    );

    // Update local state
    devicesList.push(newDevice);

    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem('devicesList', JSON.stringify(devicesList));
    } catch (error) {
      console.error('Error saving devices:', error);
    }

    console.log('Name:', name);
    console.log('Place:', place);
    console.log('Command:', command);
    console.log('Color:', color);
    navigation.navigate('Devices');
  };

  const exit = () => {
    navigation.navigate('Devices');
  };

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Place"
        value={place}
        onChangeText={(text) => setPlace(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Command"
        value={command}
        onChangeText={(text) => setCommand(text)}
      />

      <View><Text style={{ fontSize:20, marginVertical:12 }} >Colors</Text></View>
      <View style={styles.colorsContainer}>
        {Colors.map((c) => (
          <TouchableHighlight
            key={c}
            style={[
              styles.circleOneColor,
              { backgroundColor: c, borderWidth: color === c ? 2 : 0 },
            ]}
            onPress={() => handleColorSelect(c)}
          >
            <View style={{ width: 40, height: 40, borderRadius: 20 }} />
          </TouchableHighlight>
        ))}
      </View>

      <TouchableHighlight
        style={[styles.buttonContainer, styles.button, { backgroundColor: 'green' }]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={[styles.buttonContainer, styles.button, { backgroundColor: 'red' }]}
        onPress={exit}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableHighlight>
    </View>
  );
};

export default NewDeviceScreen;
