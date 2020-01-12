import React from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

const BookCount = ({ title, count }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <Text>{count}</Text>
    </View>
  );
};

export default BookCount;
