// ConnectionScreen.js

import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import styles from '../styles/ConnectionStyle';

class ConnectionScreen extends Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
    this.state = {
      device: null,
    };
  }

  checkBluetoothState() {
    const subscription = this.manager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        this.scanAndConnect();
        subscription.remove();
      }
    }, true);
  }

  scanAndConnect() {
    this.manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log('Error', error);
        return;
      }
      console.log('DEVICE ', device);
      if (device.name === 'MLT-BT05') {
        this.manager.stopDeviceScan();
        this.connectToDevice(device);
      }
    });
  }

  connectToDevice(device) {
    device.connect()
      .then((connectedDevice) => {
        return connectedDevice.discoverAllServicesAndCharacteristics();
      })
      .then((characteristic) => {
        console.log('Connected to MLT-BT05', characteristic);
        this.setState({ device: characteristic });
      })
      .catch((error) => {
        console.log('Error', error);
      });
  }

  render() {
    return (
      <View>
        <Button
          title="Scan and Connect"
          onPress={() => this.checkBluetoothState()}
          style={styles.button}
        />
        <Text>{this.state.device ? `Connected to ${this.state.device.name}` : 'Not connected'}</Text>
      </View>
    );
  }
}

export default ConnectionScreen;
