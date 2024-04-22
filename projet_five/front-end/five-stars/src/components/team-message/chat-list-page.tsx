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
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../navigationBar/navigation";

export default function ChatList({ navigation }) {
  const [discussions, setDiscussions] = useState([
    { id: "1", title: "Hector " },
    { id: "2", title: "gigi " },
    { id: "3", title: "rsko " },
    { id: "4", title: "john4" },
    { id: "5", title: "johnDoe" },
    { id: "6", title: "axel " },
    { id: "7", title: "lkg " },
    { id: "8", title: "mark " },
    { id: "9", title: "cogneur " },
    { id: "10", title: "yamil " },
    { id: "11", title: "jason " },
    { id: "12", title: "roublare " },
    { id: "13", title: "iop " },
    { id: "14", title: "sacri " },
    { id: "15", title: "mbapiñio" },
    // Ajoutez autant d'éléments que nécessaire
  ]);

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
          <Text style={styles.itemTextMessage}>{"salut"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleDiscussionPress = (discussion) => {
    // Ajoutez la logique pour naviguer vers la page de discussion spécifique
    console.log("Discussion sélectionnée:", discussion);
    navigation.reset({
      index: 0,
      routes: [{ name: "ChatPage" }],
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
