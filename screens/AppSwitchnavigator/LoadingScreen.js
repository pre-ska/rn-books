import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import colors from "../../assets/colors";

class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLogged();
  }

  checkIfLogged = () => {
    //listen for login / logout...save callback to unsubscribe varible
    this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        //navigate to home screen
        this.props.navigation.navigate("HomeScreen", { user });
      } else {
        //navigate to login screen
        this.props.navigation.navigate("LoginStackNavigator");
      }
    });
  };

  componentWillUnmount = () => this.unsubscribe();

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.logoColor} />
      </View>
    );
  }
}
export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain
  }
});
