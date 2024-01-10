import React, { useState } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/NewDeviceStyle';

const NewDeviceScreen = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [command, setCommand] = useState('');
  const [color, setColor] = useState('');

  const Colors = ["blue", "yellow", "pink", "red", "green", "purple", "orange", "grey" ]

  const navigation = useNavigation();

  const handleSave = () => {
    console.log('Name:', name);
    console.log('Place:', place);
    console.log('Command:', command);
    console.log('Color:', color);
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

<View style={styles.colorsContainer}>
  {Colors.map((c) => (
    <TouchableHighlight
      key={c}
      style={[
        styles.circleOneColor,
        { backgroundColor: c, borderWidth: color === c ? 4 : 0 },
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