
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  DeviceEventEmitter
} from 'react-native';

import Speech from 'react-native-speech';
import WS from 'react-native-websocket';


export default class App extends Component<{}> {
  // clientAddr;
  // messagecount = 1;
  // port = 8080;

  constructor() {
    super();
    this.state = {
      dataFromAlienComp: 'nothing recieved'
    }
  }

  convertToSpeech(data){
    Speech.speak({
      text: 'Car',
      voice: 'en-US'
    });
  }



  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text>{this.state.dataFromAlienComp}</Text>
        </TouchableOpacity>
        <WS
          ref={ref => {this.ws = ref}}
          url="wss://148.84.205.240:5005"
          onOpen={() => {
            console.log('Open!')
            this.ws.send('Hello')
          }}
          onMessage={console.log}
          onError={console.log}
          onClose={console.log}
          reconnect // Will try to reconnect onClose
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'red'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
