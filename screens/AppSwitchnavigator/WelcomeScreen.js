import React, { Component } from "react";
import { View, Text } from "react-native";
import { Foundation } from "@expo/vector-icons";
import colors from "../../assets/colors";

import CustomActionButton from "../../components/CustomActionButton";

export default class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
            // borderColor: "black",
            // borderWidth: 1
          }}
        >
          <Foundation
            name="book-bookmark"
            size={150}
            color={colors.logoColor}
          />
          <Text style={{ fontSize: 50, fontWeight: "100", color: "white" }}>
            Bookmarx
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            // borderColor: "orange",
            // borderWidth: 1,
            alignItems: "center",
            justifyContent: "flex-start"
          }}
        >
          <CustomActionButton
            style={{
              width: 200,
              backgroundColor: "transparent",
              borderWidth: 0.5,
              borderColor: colors.bgPrimary,
              marginBottom: 20
            }}
            onPress={() => this.props.navigation.navigate("LoginScreen")}
          >
            <Text
              style={{
                fontWeight: "100",
                color: "white"
              }}
            >
              Login
            </Text>
          </CustomActionButton>
        </View>
      </View>
    );
  }
}
