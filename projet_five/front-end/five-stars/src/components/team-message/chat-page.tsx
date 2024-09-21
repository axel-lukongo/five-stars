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
import {
  GET_CHAT_ROOM,
  GET_PRV_MESSAGE,
  GET_USER,
} from "../query_and_mutation/query";
import { useMutation, useQuery } from "@apollo/client";
import { CREAT_PRV_MESSAGE } from "../query_and_mutation/mutation";

const ChatPage = ({ navigation, route }) => {
  const { interlocuteurId, userId } = route.params;
  const [message, setMessage] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [createPrvMessage, { loading, error, data }] =
    useMutation(CREAT_PRV_MESSAGE);
  const [ChatId, setChatId] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
  const [interlocutorName, setInterlocutorName] = useState("");
  const [messages, setMessages] = useState([]);

  //######################### i grab data of interlocutor #################
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(GET_USER, {
    variables: { id: interlocuteurId },
  });

  useEffect(() => {
    if (userData && userData.getUser) {
      setInterlocutorName(userData.getUser.lastname);
    }
  }, [userData]);

  useLayoutEffect(() => {
    const getinfo = async () => {
      setFirstname(await AsyncStorage.getItem("Firstname"));
      setLastname(await AsyncStorage.getItem("Lastname"));
    };
    getinfo();
  }, []);

  //######################### i grab all the id of the Room #################
  const {
    loading: chatLoading,
    error: chatError,
    data: chatData,
  } = useQuery(GET_CHAT_ROOM, {
    variables: { UserIdOne: userId, UserIdTwo: interlocuteurId },
  });

  useEffect(() => {
    if (chatData && chatData.getChatRoom) {
      setChatId(chatData.getChatRoom.id);
    }
  }, [chatData]);

  //######################### i grab all message #################
  const {
    loading: msgLoading,
    error: msgError,
    data: msgData,
    refetch,
  } = useQuery(GET_PRV_MESSAGE, {
    variables: { ChatRoomId: ChatId },
  });

  useEffect(() => {
    refetch();
    if (msgData && msgData.getPrivateMessages) {
      const newMessages = msgData.getPrivateMessages.map((msg) => ({
        id: Math.random().toString(), // Assurez-vous que chaque message a un identifiant unique
        text: msg.MessageContent, // Utilisez correctement le champ MessageContent
        sendername: msg.senderName,
      }));
      setMessages(newMessages);
    }
  }, [msgData, refetch]);

  //######################### i go back to the preview page #################
  const goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "ChatList", params: { UserId: userId } }],
    });
  };
  const onHeaderLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeaderHeight(height);
  };

  //######################### i Send the message #################
  const sendMessage = () => {
    if (message.trim() !== "") {
      createPrvMessage({
        variables: {
          SenderName: firstname,
          ChatRoomId: ChatId,
          Content: message,
        },
      });
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
                {item.sendername ? item.sendername : firstname}{" "}
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
    backgroundColor: "#fff",
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
