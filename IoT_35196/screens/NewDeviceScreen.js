import React, {useState} from 'react';
import {Text, View, TextInput, Button, Picker} from 'react-native';
import DevicesScreen from './DevicesScreen';
import { useNavigation } from '@react-navigation/native';

const NewDeviceScreen = () => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [command, setCommand] = useState('');
  const [color, setColor] = useState('');

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

  const handleCancel = () => {

    console.log('Cancelled');
  };


  return (
    <View>
        <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        />
        <TextInput
        placeholder="Place"
        value={name}
        onChangeText={(text) => setName(text)}
        />
      <TextInput
        placeholder="Command"
        value={command}
        onChangeText={(text) => setCommand(text)}
      />
       <Button title="Save" onPress={handleSave} ></Button>
       <Button title="Cancel" onPress={exit} ></Button>
    </View>
  );
};
export default NewDeviceScreen;