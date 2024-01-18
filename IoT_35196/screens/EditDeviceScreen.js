// EditDeviceScreen.js

import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableHighlight, ToastAndroid } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../styles/EditDeviceStyle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BleManager } from 'react-native-ble-plx';

const EditDeviceScreen = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [command, setCommand] = useState('');
  const [color, setColor] = useState('');
  const Colors = ["blue", "yellow", "pink", "red", "green", "purple", "orange"];
  const navigation = useNavigation();
  const route = useRoute();
  const { deviceToEdit } = route.params || {};

  useEffect(() => {
    if (deviceToEdit) {
      setName(deviceToEdit.name || '');
      setPlace(deviceToEdit.place || '');
      setCommand(deviceToEdit.command || '');
      setColor(deviceToEdit.color || Colors[0]);
    }
  }, [deviceToEdit]);

  const handleSave = async () => {
    try {
      const updatedDevice = {
        name,
        place,
        command,
        color,
      };
      const storedDevicesList = await AsyncStorage.getItem('devicesList');
      let updatedDevicesList = storedDevicesList ? JSON.parse(storedDevicesList) : [];

      if (deviceToEdit) {
        updatedDevicesList = updatedDevicesList.map((device) =>
          device.id === deviceToEdit.id ? { ...device, ...updatedDevice } : device
        );
      } else {
        const newDevice = { ...updatedDevice, id: Date.now().toString() };
        updatedDevicesList.push(newDevice);
      }
      await AsyncStorage.setItem('devicesList', JSON.stringify(updatedDevicesList));
      console.log('Edit successful');
      navigation.navigate('Devices');
    } catch (error) {
      console.error('Error saving device:', error);
    }
  };

  const exit = () => {
    navigation.navigate('Devices');
  };

  const handleColorSelect = (selectedColor) => {
    setColor(selectedColor);
  };

  const handleCommandSend = async () => {
    if (deviceToEdit) {
      try {
        await changeDevice(command);
        ToastAndroid.show('Command sent successfully', ToastAndroid.SHORT);
      } catch (error) {
        console.log('Error sending command:', error);
        ToastAndroid.show('Error sending command', ToastAndroid.SHORT);
      }
    }
  };

  const changeDevice = async (command) => {
    
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

      <View><Text style={{color: 'grey', fontSize:20, marginVertical:12 }} >Colors</Text></View>
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
        style={[styles.buttonContainer, styles.button, { backgroundColor: 'blue' }]}
        onPress={handleCommandSend}
      >
        <Text style={styles.buttonText}>Send Command</Text>
      </TouchableHighlight>

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

export default EditDeviceScreen;