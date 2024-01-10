// Apps.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DevicesScreen from './screens/DevicesScreen';
import NewDeviceScreen from './screens/NewDeviceScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import EditDeviceScreen from './screens/EditDeviceScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Devices" component={DevicesScreen} />
      <Tab.Screen name="Connection" component={ConnectionScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Device" component={BottomTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="New Device" component={NewDeviceScreen} />
        <Stack.Screen name="Connection" component={ConnectionScreen} />
        <Stack.Screen name="Edit Device" component={EditDeviceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;