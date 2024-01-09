import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { devicesList } from '../data/devices';
import styles from '../styles/DevicesStyle';

const DevicesScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemText}>{item.place}</Text>
    </View>
  );

  return (
    <FlatList
      data={devicesList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container} // Change style to contentContainerStyle
    />
  );
};

export default DevicesScreen;
