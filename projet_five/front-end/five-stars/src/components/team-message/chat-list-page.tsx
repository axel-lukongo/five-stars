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
import { GET_USERS } from "../query_and_mutation/query";
import { useQuery } from "@apollo/client";

export default function ChatList({ navigation }) {
  const { loading, error, data } = useQuery(GET_USERS); // Effectuez la requête GraphQL

  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    if (data && data.getUsers) {
      setDiscussions(
        data.getUsers.map((user) => ({ id: user.id, title: user.firstname }))
      );
    }
  }, [data]);

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
    // Ajoutez la logique pour naviguer vers la page de discussion spécifique
    // console.log("Discussion sélectionnée:", discussion);
    navigation.reset({
      index: 0,
      routes: [
        { name: "ChatPage", params: { interlocuteurId: discussion.id } },
      ],
    });
  };

  return (
    <LinearGradient
      colors={["#1c1c1c", "#0C2E00"]} // Assurez-vous que les couleurs sont correctement définies
      style={styles.container}
    >
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
    color: "white",
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
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  itemTextName: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },

  itemTextMessage: {
    fontSize: 15,
    color: "white",
  },

  avatar: {
    width: 50, // La largeur de l'avatar
    height: 50, // La hauteur de l'avatar
    borderRadius: 25, // Pour le rendre circulaire
    marginRight: 10, // Espace entre l'avatar et le texte
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});
