import React from 'react';
import { Text, View, FlatList } from 'react-native';
import { devicesList } from '../data/devices';
import styles from '../styles/DevicesStyle';

const DevicesScreen = () => {
  const extendedDevicesList = [...devicesList, { id: '+', name: '+', place: '' }];

  const renderItem = ({ item, index }) => {
    const isLastItem = index === extendedDevicesList.length - 1;
    const itemContainerStyle = isLastItem ? styles.lastItemContainer : styles.itemContainer;
    const itemNameStyle = isLastItem ? styles.lastItemName : styles.itemName;
    const itemTextStyle = isLastItem ? styles.lastItemText : styles.itemText;

    return (
      <View style={itemContainerStyle}>
        <Text style={itemNameStyle}>{item.name}</Text>
        <Text style={itemTextStyle}>{item.place}</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={extendedDevicesList}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

export default DevicesScreen;
