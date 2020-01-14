import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import colors from "../assets/colors";
import CustomActionButton from "../components/CustomActionButton";

//firebase imports
import * as firebase from "firebase/app";
import "firebase/auth";
/////////////////////////////////////

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      passwords: "",
      isLoading: false
    };
  }

  onSignIn = () => {};

  onSignUp = async () => {
    if (this.state.email && this.state.password) {
      try {
        const response = await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
      } catch (error) {
        if (error.code == "auth/email-already-in-use")
          alert("User already exists.");
      }
    } else {
      alert("Pleas enter email and password");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            style={styles.textInput}
            placeholder="name@example.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={styles.textInput}
            placeholder="enter password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
            onChangeText={password => this.setState({ password })}
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <CustomActionButton
              onPress={this.onSignIn}
              style={[styles.loginButtons]}
            >
              <Text style={{ color: "white" }}>Login</Text>
            </CustomActionButton>
            <CustomActionButton
              onPress={this.onSignUp}
              style={[styles.loginButtons]}
            >
              <Text style={{ color: "white" }}>Signup</Text>
            </CustomActionButton>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: colors.txtWhite,
    paddingHorizontal: 10
  },
  loginButtons: {
    borderWidth: 0.5,
    backgroundColor: "transparent",
    marginTop: 10,
    width: 200
  }
});
