import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ConnectionStyle';
import { encode } from 'base-64';

class ConnectionScreen extends Component {
  
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      scannedDevicesList: [],
    };
  }
  connected_id = 1;

  checkBluetoothState() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanDevices();
        subscription.remove();
      }
    }, true);
  }

  scanDevices() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('error', error);
        return;
      }
      this.handleScannedDevice(device);
    });
  }

  addDeviceMLT() {
    this.manager.startDeviceScan(null, null, async (error, device) => {
      if (error) {
        console.log('error', error);
        return;
      }
  
      //console.log('DEVICE', device);
  
      const existingDeviceIndex = this.state.scannedDevicesList.findIndex((d) => d.id === device.id);
  
      if (existingDeviceIndex === -1) {
        this.handleScannedDevice(device);
      }
  
      if (device.name === 'MLT-BT05') {
        this.manager.stopDeviceScan();
        this.setState({ scannedDevicesList: [] });
  
        try {
          const connectedDevice = await device.connect();
          await connectedDevice.discoverAllServicesAndCharacteristics();

          // const services = connectedDevice.services();
          // const characteristics = connectedDevice.characteristics();
          // const serviceUUID = services[0].uuid;
          // const characteristicUUID = characteristics[0].uuid;

          // console.log('serviceUUID: '+connectedDevice.serviceUUID+'\nconnectedDevice: '+connectedDevice.characteristicUUID);
          connected_id = connectedDevice.id;

          const deviceInfo = {
            id: connectedDevice.id,
            serviceUUID: 'FFE0',
            characteristicUUID: 'FFE1'
          };
  
          this.handleSaveDevice(deviceInfo.id, device.name);
          console.log('MLT-BT05 is Added');
      } catch (error) {
        console.log('Error', error);
      }
      }
    });
  }

  handleSaveDevice = async (deviceId, deviceName) => {
    try {
      const existingDevicesString = await AsyncStorage.getItem('devicesList');
      const existingDevices = existingDevicesString ? JSON.parse(existingDevicesString) : [];
      const existingDevice = existingDevices.find((d) => d.id === deviceId);

      if (!existingDevice) {
        const newDevice = { id: deviceId, name: deviceName, color: 'yellow' };
        existingDevices.push(newDevice);
        await AsyncStorage.setItem('devicesList', JSON.stringify(existingDevices));
      }
    } catch (error) {
      console.error('Error saving device:', error);
    }
  };

  handleScannedDevice(device) {
    const { id, name } = device;
    const existingDeviceIndex = this.state.scannedDevicesList.findIndex((d) => d.id === id);

    if (existingDeviceIndex === -1) {
      const newDeviceName = name || `Device ${this.state.scannedDevicesList.length + 1}`;
      const newScannedDevicesList = [...this.state.scannedDevicesList, { id, name: newDeviceName }];
      this.setState({ scannedDevicesList: newScannedDevicesList });
    }
  }

  changeDevice(command) {
        this.manager.writeCharacteristicWithResponseForDevice(
          connected_id, 'FFE0', 'FFE1', encode(command)
        ).then(response => {
          console.log('response', response);
        }).catch((error) => {
          console.log('Error', error);
        });
  }


  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonScan, { marginTop: 10 }]}
          onPress={() => this.scanDevices()}
        >
          <Text style={styles.buttonText}>Scan Device</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonScan}
          onPress={() => this.addDeviceMLT()}
        >
          <Text style={styles.buttonText}>Connect with MLT-BT05</Text>
        </TouchableOpacity>
        <View style={[styles.buttonContainer, styles.commandButtonsContainer]}>
          <TouchableOpacity
            style={[styles.buttonCommends, styles.redButton]}
            onPress={() => this.changeDevice('red')}
          >
            <Text style={styles.buttonText}>Red</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonCommends, styles.greenButton]}
            onPress={() => this.changeDevice('green')}
          >
            <Text style={styles.buttonText}>Green</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonCommends, styles.blueButton]}
            onPress={() => this.changeDevice('blue')}
          >
            <Text style={styles.buttonText}>Blue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonCommends, styles.offButton]}
            onPress={() => this.changeDevice('off')}
          >
            <Text style={styles.buttonText}>Turn Off</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={this.state.scannedDevicesList}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.handleSaveDevice(item.id, item.name)}>
              <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemText}>{item.id}</Text>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

export default ConnectionScreen;