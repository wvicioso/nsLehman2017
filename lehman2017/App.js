
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';

import Speech from 'react-native-speech';
import WS from 'react-native-websocket';

const {width, height} = Dimensions

export default class App extends Component<{}> {

  constructor() {
    super();
    this.state = {
      data: 'No Detection'
    }
  }

  convertToSpeech(resp){
    if (resp != undefined && resp.type != 'error') {
      Speech.speak({
        text: resp.data,
        voice: 'en-US'
      });
      this.setState({
        data: resp.data
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={style.background}
          source={{uri: 'https://i.pinimg.com/736x/bc/b2/eb/bcb2ebe4b6a5712bf0ad445d3688cc3f--background-pictures-wallpaper-for.jpg'}}
        />
        <View style={styles.header}>
          <Image
            style={styles.logoImg}
            source={require('./img/eye.png')}
          />
          <Text style={styles.logoLetter}>A</Text>
        </View>
        <View style={styles.button}>
          <Text style={styles.text}>
            {this.state.data}
          </Text>
        </View>
        <WS
          ref={ref => {this.ws = ref}}
          url="ws://148.84.204.98:8080"
          onOpen={() => {
            console.log('Open!')
          }}
          onMessage={(resp) => {
            this.convertToSpeech(resp);
          }}
          onError={console.log}
          onClose={console.log}
          reconnect // Will try to reconnect onClose
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  },
  logoImg: {
    width: 200,
    height: 150,
    top: 60
  },
  logoLetter:{
    position: 'absolute',
    fontSize: 50,
    color: 'white',
    top: 80,
    backgroundColor: 'transparent'
  },
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
    backgroundColor: 'rgba(255,255,255,.7)'
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#e0e0e0'
  },
  text: {
    color: 'black'
    padding: 20,
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 40,
  }
});
