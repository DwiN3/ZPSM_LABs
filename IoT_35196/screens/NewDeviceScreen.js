import React, { useState } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/NewDeviceStyle';

import { devices, devicesList } from '../data/devices';

const NewDeviceScreen = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [command, setCommand] = useState('');
  const Colors = ["blue", "yellow", "pink", "red", "green", "purple", "orange"];
  const [color, setColor] = useState(Colors[0]);

  const navigation = useNavigation();

  const handleSave = () => {
    const newDevice = new devices(
      (devicesList.length + 1).toString(), // Auto-increment ID
      name,
      place,
      command,
      color
    );

    devicesList.push(newDevice); // Add the new device to the list

    console.log('Name:', name);
    console.log('Place:', place);
    console.log('Command:', command);
    console.log('Color:', color);

    // You might want to save the updated devicesList to persistent storage here
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
