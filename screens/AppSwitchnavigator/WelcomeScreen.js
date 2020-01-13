import React, { Component } from "react";
import { View, Text } from "react-native";

export default class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={{flex: 1 borderColor: 'black', borderWidth: 1}}></View>
        <View style={{flex: 1 borderColor: 'orange', borderWidth: 1}}></View>
      </View>
    );
  }
}
