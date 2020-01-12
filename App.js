import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import BookCount from "./components/BookCount";
import { Ionicons } from "@expo/vector-icons";
import { setLightEstimationEnabled } from "expo/build/AR";

export default function App() {
  const [totalCount, setTotalCount] = useState(0);
  const [readingCount, setReadingCount] = useState(0);
  const [readCount, setReadCount] = useState(0);
  const [isAddNewBookVisible, setIsAddNewBookVisible] = useState(false);
  const [textInputData, setTextInputData] = useState("");
  const [books, setBooks] = useState([]);

  const showAddNewBook = () => {
    setIsAddNewBookVisible(true);
  };

  const hideAddNewBook = () => {
    setIsAddNewBookVisible(false);
  };

  const addBook = book => {
    setBooks(prev => [...prev, book]);
    setTotalCount(prev => prev + 1);
    setReadingCount(prev => prev + 1);
  };

  const renderItem = (item, index) => (
    <View style={{ height: 50, flexDirection: "row" }}>
      <View style={{ flex: 1, justifyContent: "center", paddingLeft: 5 }}>
        <Text>{item}</Text>
      </View>
      <TouchableOpacity onPress={() => addBook(textInputData)}>
        <View
          style={{
            width: 100,
            height: 50,
            backgroundColor: "#a5deba",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={{ fontWeight: "bold", color: "white" }}>
            Mark as read
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView />
      <View
        style={{
          height: 70,
          borderBottomWidth: 1,
          borderBottomColor: "#e9e9e9",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text style={{ fontSize: 24 }}>Book Worm</Text>
      </View>
      <View style={{ flex: 1 }}>
        {isAddNewBookVisible && (
          <View style={{ height: 50, flexDirection: "row" }}>
            <TextInput
              onChangeText={text => setTextInputData(text)}
              style={{ flex: 1, backgroundColor: "#ececec", paddingLeft: 5 }}
              placeholder="Enter Book Name"
              placeholderTextColor="grey"
            />

            <TouchableOpacity onPress={() => addBook(textInputData)}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#a5deba",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Ionicons name="ios-checkmark" color="white" size={40} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideAddNewBook}>
              <View
                style={{
                  width: 50,
                  height: 50,
                  backgroundColor: "#deada5",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Ionicons name="ios-close" color="white" size={40} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={books}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={{ marginTop: 50, alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>Not Reading Any Books.</Text>
            </View>
          }
        />

        <TouchableOpacity
          style={{ position: "absolute", bottom: 20, right: 20 }}
          onPress={showAddNewBook}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: "#aad1e6",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 30 }}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 70,
          borderTopWidth: 1,
          borderTopColor: "#e9e9e9",
          flexDirection: "row"
        }}
      >
        <BookCount title="Total" count={totalCount} />
        <BookCount title="Reading" count={readingCount} />
        <BookCount title="Read" count={readCount} />
        {/* 
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20 }}>Total</Text>
          <Text style={{}}>{totalCount}</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20 }}>Reading</Text>
          <Text style={{}}>{readingCount}</Text>
        </View>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ fontSize: 20 }}>Read</Text>
          <Text style={{}}>{readCount}</Text>
        </View> */}
      </View>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: "red"
  }
});
