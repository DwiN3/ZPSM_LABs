import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ConnectionStyle';

class ConnectScreen extends Component {
  constructor(props) {
    super(props);
    this.manager = new BleManager();
  }

  componentDidMount() {
    this.checkBluetoothState();
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
        console.log('Error during scanning:', error);
        return;
      }

      console.log('Found device:', device);
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
        console.log('Device connected and characteristics discovered:', characteristic);

        const deviceInfo = {
          id: device.id,
          serviceUUID: 'FFE0',
          characteristicUUID: 'FFE1',
        };

        AsyncStorage.setItem('device', JSON.stringify(deviceInfo)).then(() => {
          this.props.navigation.navigate('Devices');
        });
      })
      .catch((error) => {
        console.log('Error connecting to device:', error);
      });
  }

  sendCommandToDevice(command) {
    AsyncStorage.getItem('device').then(deviceInfo => {
      deviceInfo = JSON.parse(deviceInfo);
      if (deviceInfo) {
        this.manager.writeCharacteristicWithResponseForDevice(
          deviceInfo.id, deviceInfo.serviceUUID, deviceInfo.characteristicUUID, btoa(command)
        ).then(response => {
          console.log(`Command "${command}" sent successfully. Response:`, response);
        }).catch((error) => {
          console.log('Error:', error);
        });
      }
    });
  }

  receiveDataFromDevice() {
    AsyncStorage.getItem('device').then(deviceInfo => {
      deviceInfo = JSON.parse(deviceInfo);
      if (deviceInfo) {
        this.manager.monitorCharacteristicForDevice(
          deviceInfo.id, deviceInfo.serviceUUID, deviceInfo.characteristicUUID, async (error, response) => {
            const value = response && response.value ? atob(response.value) : null;
            console.log('Received and decoded value:', value);
            if (error) {
              console.log('Error receiving data:', error);
            }
          }
        ).catch(error => {
          console.log('Error monitoring characteristic:', error);
        });
      }
    });
  }

  render() {
    return (
      <View>
        <Text style={{ color: 'white' }}></Text>
        <TouchableOpacity
          style={styles.buttonScan}
          onPress={() => this.scanAndConnect()}
        >
          <Text style={styles.buttonText}>Scan and Connect</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonScan, { marginTop: -30 }]}
          onPress={() => this.receiveDataFromDevice()}
        >
          <Text style={styles.buttonText}>Receive Data</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.redButton]}
            onPress={() => this.sendCommandToDevice('red')}
          >
            <Text style={styles.buttonText}>Red</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.greenButton]}
            onPress={() => this.sendCommandToDevice('green')}
          >
            <Text style={styles.buttonText}>Green</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.blueButton]}
            onPress={() => this.sendCommandToDevice('blue')}
          >
            <Text style={styles.buttonText}>Blue</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.offButton]}
            onPress={() => this.sendCommandToDevice('off')}
          >
            <Text style={styles.buttonText}>Turn Off</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ConnectScreen;