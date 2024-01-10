import React from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { devicesList } from '../data/devices';
import styles from '../styles/DevicesStyle';

const DevicesScreen = () => {
  const navigation = useNavigation();

  const extendedDevicesList = [...devicesList, { id: '+', name: '+', place: '' }];

  const renderItem = ({ item, index }) => {
    const isLastItem = index === extendedDevicesList.length - 1;
    const backgroundColor = isLastItem ? 'white' : item.color;
    const itemContainerStyle = {
      ...styles.itemContainer,
      backgroundColor: backgroundColor,
    };
    const itemNameStyle = isLastItem ? styles.lastItemName : styles.itemName;
    const itemTextStyle = isLastItem ? styles.lastItemText : styles.itemText;

    const onPressItem = () => {
      if (isLastItem) {
        navigation.navigate('New Device');
      } else {
        // Handle press for other items if needed
      }
    };

    return (
      <TouchableOpacity onPress={onPressItem}>
        <View style={itemContainerStyle}>
          <Text style={itemNameStyle}>{item.name}</Text>
          <Text style={itemTextStyle}>{item.place}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <FlatList
          data={extendedDevicesList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2} 
        />
    </View>
  );
};

export default DevicesScreen;
