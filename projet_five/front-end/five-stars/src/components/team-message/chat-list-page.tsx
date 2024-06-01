import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../navigationBar/navigation";
import { GET_ALL_MY_CHAT_ROOM, GET_USERS } from "../query_and_mutation/query";
import { useQuery } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute } from "@react-navigation/native";

export default function ChatList({ navigation }) {
  const route = useRoute();
  const UserId = parseInt(route.params.UserId, 10);
  const [discussions, setDiscussions] = useState([]);

  const { loading, error, data } = useQuery(GET_ALL_MY_CHAT_ROOM, {
    variables: { UserId: UserId },
    skip: !UserId,
  });
  useEffect(() => {
    
    if (data && data.getallMyChatRoom) {
      setDiscussions(
        data.getallMyChatRoom.map((room) => ({
          id: room.UserIdOne === UserId? room.UserIdTwo:room.UserIdOne,
          title: room.UserIdOne === UserId? room.interlocutorNameTwo: room.interlocutorNameOne
        }))
      );
    }
  }, [UserId]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleDiscussionPress(item)}
    >
      <View style={styles.row}>
        <Image
          source={require("./../../../images/user.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.itemTextName}>{item.title}</Text>
          <Text style={styles.itemTextMessage}>{"Message"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleDiscussionPress = (discussion) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "ChatPage", params: { interlocuteurId: discussion.id } }],
    });
  };
  return (
    <LinearGradient colors={["#EBEBEB", "#EBEBEB"]} style={styles.container}>
      {/* Titre de la page, fixe */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Message</Text>
      </View>

      <FlatList
        data={discussions}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <NavBar navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100, // Assurez-vous que cela est suffisant pour rendre toute la navbar visible
  },

  header: {
    // Style pour le header, qui contient le titre de la page
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "transparent", // Ou une autre couleur si nécessaire
  },

  pageTitle: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    backgroundColor: "rgba(255, 156, 51, 0.7)",
    padding: "15%",
    borderRadius: 5,
    margin: "5%", // Ajoutez un espace entre les boutons
    width: "100%", // Ajustez la largeur selon vos préférences
    alignItems: "center",
  },

  row: {
    flexDirection: "row",
    alignItems: "center", // Centre les éléments verticalement dans le conteneur
  },

  itemContainer: {
    padding: 16,
    margin: 10, // Ajoute un espace entre les rectangles
    borderRadius: 20, // Pour arrondir les coins du rectangle
    backgroundColor: "#f0f0f0", // Couleur de fond du rectangle
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2, // Pour l'effet d'ombre sur Android
  },

  itemTextName: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  },

  itemTextMessage: {
    fontSize: 15,
    color: "black",
  },

  avatar: {
    width: 50, // La largeur de l'avatar
    height: 50, // La hauteur de l'avatar
    borderRadius: 25, // Pour le rendre circulaire
    marginRight: 10, // Espace entre l'avatar et le texte
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});
