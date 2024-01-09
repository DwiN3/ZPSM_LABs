import React from 'react';
import {Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DevicesScreen from './screens/DevicesScreen';
import NewDeviceScreen from './screens/NewDeviceScreen';

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Devices" component={DevicesScreen}/>
        <Stack.Screen name="New Devices" component={NewDeviceScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;