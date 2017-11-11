
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';

const {width, height} = Dimensions

import Speech from 'react-native-speech';
import WS from 'react-native-websocket';

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      data: 'No Detection',
      connected: true,
      chatter: []
    }
  }

  updateChatter(msg) {
    this.setState({
        chatter: this.state.chatter.concat([msg])
    });
  }

  convertToSpeech(resp){
    if (resp != undefined && resp.type != 'error') {
      Speech.speak({
        text: resp.data,
        voice: 'en-US'
      });

      this.setState({
        data: resp.data
      })
    }
  }
  render() {
    return (
  <Image style={{ backgroundColor: 'red', flex: 1, width: 100, height: 100}} source={{uri: 'http://iconshow.me/media/images/Mixed/Free-Flat-UI-Icons/png/512/eye-24-512.png'}} />
)}
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <View style={styles.header}>
  //         {/* <Text style={styles.headerText}>A-eye</Text> */}
  //       </View>
  //       <View style={[styles.button, {backgroundColor: 'white'}]}>
  //         <Text style={[styles.text, {fontSize: 40, color: 'black'}]}>{this.state.data}</Text>
  //       </View>
  //       <WS
  //         ref={ref => {this.ws = ref}}
  //         url="ws://148.84.204.98:8080"
  //         onOpen={() => {
  //           console.log('Open!')
  //           // this.ws.send('====== ARE YOU THIS? =====')
  //         }}
  //         onMessage={(resp) => {
  //           this.convertToSpeech(resp);
  //         }}
  //         onError={console.log}
  //         onClose={console.log}
  //         reconnect // Will try to reconnect onClose
  //       />
  //     </View>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    width,
    height: 100,
  },
  headerText: {
    fontSize: 50
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e0e0e0'
  },
  text: {
    color: 'white',
    fontWeight: '200',
    textAlign: 'center',
    padding: 20,
  }
});
