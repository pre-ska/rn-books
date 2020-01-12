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
import CustomActionButton from "./components/CustomActionButton";

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
    setIsAddNewBookVisible(false);
  };

  const markAsRead = (selectedBook, index) => {
    let newList = books.filter(book => book !== selectedBook);
    setBooks(newList);
    setReadingCount(prev => prev - 1);
    setReadCount(prev => prev + 1);
  };

  const renderItem = (item, index) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTitleContainer}>
        <Text>{item}</Text>
      </View>
      <CustomActionButton
        style={styles.markAsReadButton}
        onPress={() => markAsRead(item, index)}
      >
        <Text style={styles.markAsReadButtonText}>Mark as read</Text>
      </CustomActionButton>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Worm</Text>
      </View>
      <View style={styles.container}>
        {isAddNewBookVisible && (
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={text => setTextInputData(text)}
              style={styles.textInput}
              placeholder="Enter Book Name"
              placeholderTextColor="grey"
            />
            <CustomActionButton
              style={styles.checkmarkButton}
              onPress={() => addBook(textInputData)}
            >
              <Ionicons name="ios-checkmark" color="white" size={40} />
            </CustomActionButton>

            <CustomActionButton onPress={hideAddNewBook}>
              <Ionicons name="ios-close" color="white" size={40} />
            </CustomActionButton>
          </View>
        )}
        <FlatList
          data={books}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View style={styles.listEmptyComponent}>
              <Text style={styles.listEmptyComponentText}>
                Not Reading Any Books.
              </Text>
            </View>
          }
        />

        <CustomActionButton
          position="right"
          onPress={showAddNewBook}
          style={styles.addNewBookButton}
        >
          <Text style={styles.addNewBookButtonText}>+</Text>
        </CustomActionButton>
      </View>
      <View style={styles.footer}>
        <BookCount title="Total" count={totalCount} />
        <BookCount title="Reading" count={readingCount} />
        <BookCount title="Read" count={readCount} />
      </View>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: "#e9e9e9",
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: {
    fontSize: 24
  },
  textInputContainer: {
    height: 50,
    flexDirection: "row"
  },
  textInput: {
    flex: 1,
    backgroundColor: "#ececec",
    paddingLeft: 5
  },
  checkmarkButton: {
    backgroundColor: "#a5deba"
  },
  listItemContainer: {
    height: 50,
    flexDirection: "row"
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center"
  },
  listEmptyComponentText: {
    fontWeight: "bold"
  },
  markAsReadButton: {
    width: 100,
    backgroundColor: "#a5deba"
  },
  markAsReadButtonText: {
    fontWeight: "bold",
    color: "#FFF"
  },
  addNewBookButton: {
    backgroundColor: "#aad1e6",
    borderRadius: 25
  },
  addNewBookButtonText: {
    color: "#FFF",
    fontSize: 30
  },
  footer: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: "#e9e9e9",
    flexDirection: "row"
  }
  // containerLoading: {
  //   ...StyleSheet.absoluteFill,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   zIndex: 1000,
  //   elevation: 1000,
  // },
  // buttonDelete: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // swipeout: {
  //   marginHorizontal: 5,
  //   marginVertical: 5,
  // },
  // iconSwip: {
  //   marginRight: 5,
  // },
});
