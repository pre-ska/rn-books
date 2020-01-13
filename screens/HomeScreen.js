import React, { useState, useEffect, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList
} from "react-native";
import BookCount from "../components/BookCount";
import { Ionicons } from "@expo/vector-icons";
import CustomActionButton from "../components/CustomActionButton";

import colors from "../assets/colors";

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: {},
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      textInput: "",
      books: []
    };
  }
  // const [totalCount, setTotalCount] = useState(0);
  // const [readingCount, setReadingCount] = useState(0);
  // const [readCount, setReadCount] = useState(0);
  // const [isAddNewBookVisible, setIsAddNewBookVisible] = useState(false);
  // const [textInputData, setTextInputData] = useState("");
  // const [books, setBooks] = useState([]);

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = book => {
    this.setState(prev => ({
      books: [...prev.books, book],
      totalCount: prev.totalCount + 1,
      readingCount: prev.readingCount + 1,
      isAddNewBookVisible: false
    }));

    // setBooks(prev => [...prev, book]);
    // setTotalCount(prev => prev + 1);
    // setReadingCount(prev => prev + 1);
    // setIsAddNewBookVisible(false);
  };

  markAsRead = (selectedBook, index) => {
    let newList = this.state.books.filter(book => book !== selectedBook);

    this.setState(prev => ({
      books: newList,
      readingCount: prev.readingCount - 1,
      readCount: prev.readCount + 1
    }));
    // setBooks(newList);
    // setReadingCount(prev => prev - 1);
    // setReadCount(prev => prev + 1);
  };

  renderItem = (item, index) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTitleContainer}>
        <Text>{item}</Text>
      </View>
      <CustomActionButton
        style={styles.markAsReadButton}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={styles.markAsReadButtonText}>Mark as read</Text>
      </CustomActionButton>
    </View>
  );

  render() {
    const {
      isAddNewBookVisible,
      books,
      totalCount,
      readingCount,
      readCount,
      textInput
    } = this.state;

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
                onChangeText={text => this.setState({ textInput: text })}
                style={styles.textInput}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
              />
              <CustomActionButton
                style={styles.checkmarkButton}
                onPress={() => this.addBook(textInput)}
              >
                <Ionicons name="ios-checkmark" color="white" size={40} />
              </CustomActionButton>

              <CustomActionButton onPress={this.hideAddNewBook}>
                <Ionicons name="ios-close" color="white" size={40} />
              </CustomActionButton>
            </View>
          )}
          <FlatList
            data={books}
            renderItem={({ item, index }) => this.renderItem(item, index)}
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
            onPress={this.showAddNewBook}
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
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
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
    backgroundColor: colors.bgTextInput,
    paddingLeft: 5
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess
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
    backgroundColor: colors.bgSuccess
  },
  markAsReadButtonText: {
    fontWeight: "bold",
    color: "#FFF"
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25
  },
  addNewBookButtonText: {
    color: "#FFF",
    fontSize: 30
  },
  footer: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: colors.borderColor,
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
