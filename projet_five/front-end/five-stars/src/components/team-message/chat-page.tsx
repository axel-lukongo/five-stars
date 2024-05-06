import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  Keyboard,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { GET_USER } from "../query_and_mutation/query";
import { useQuery } from "@apollo/client";

const ChatPage = ({ navigation, route }) => {
  const { interlocuteurId } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
  const [interlocutorName, setInterlocutorName] = useState("");
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { id: interlocuteurId },
  });

  useEffect(() => {
    if (data && data.getUser) {
      setInterlocutorName(data.getUser.lastname);
    }
  }, [data]);

  useLayoutEffect(() => {
    const getinfo = async () => {
      setFirstname(await AsyncStorage.getItem("Firstname"));
      setLastname(await AsyncStorage.getItem("Lastname"));
    };

    getinfo();
  }, []);

  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "ChatList" }],
    });
  };
  const onHeaderLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Math.random().toString(), text: message },
      ]);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer} onLayout={onHeaderLayout}>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <Text style={styles.interlocutorName}>{interlocutorName}</Text>
          <TouchableOpacity style={styles.backbutton} onPress={goBack} />
        </View>
      </View>
      <FlatList
        style={{ flex: 1, marginTop: headerHeight - 40 }}
        contentContainerStyle={{ paddingBottom: 10 }}
        data={messages}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <View style={styles.myNameContainer}>
              <Text style={styles.myName}>
                {" "}
                {firstname} {lastname}{" "}
              </Text>
            </View>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholder="Type your message here..."
          placeholderTextColor="white"
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#c8dbc8",
  },
  headerContainer: {
    backgroundColor: "#81c27c", // Couleur de fond du conteneur du nom et de l'avatar (gris foncé)
    paddingTop: 20, // Padding supérieur
    paddingHorizontal: 20,
    borderRadius: 20,
    top: 20,
    width: "100%", // Pour occuper toute la largeur de l'écran
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Add this line
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff", // Couleur de fond de l'avatar
    marginRight: 10,
  },
  interlocutorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff", // Couleur du nom de l'interlocuteur
  },
  messagesContainer: {
    marginTop: 10,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 10,
    // backgroundColor: '#6d736d',
    backgroundColor: "rgba(101, 140, 240, 0.1)", // Couleur de fond légèrement transparente

    borderRadius: 20,
  },
  myNameContainer: {
    alignItems: "flex-end",
    marginBottom: 5,
  },
  myName: {
    color: "black",
    fontSize: 12,
  },
  messageText: {
    color: "black", // Couleur du texte du message
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#777877",
    paddingTop: 10,
  },
  input: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#777877",
    borderRadius: 20,
    color: "black", // Définir la couleur du texte en blanc
  },
  backbutton: {
    width: 20,
    height: 20,
    backgroundColor: "#f0f0f0",
  },
});

export default ChatPage;
