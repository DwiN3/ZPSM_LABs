import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Feed from "./screens/Feed";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function TabGroup() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home Page" component={Feed}/>
    </Tab.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <TabGroup/>
    </NavigationContainer>
  );
}