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

export default function HomePage({ navigation }) {
  const [newsInfo, setNewsInfo] = useState("Informations en temps réel...");
  const [posts, setPosts] = useState([
    { id: "1", type: "photo", content: "Image 1" },
    { id: "2", type: "video", content: "Vidéo 1" },
    // Ajoutez autant de publications que nécessaire
  ]);

  /*************************
   * trouver un moyen d'afficher les photo et video de tous les gens de l'appli
   * afficher les information en temps reel des resultats de match
   * acceder au profile de chaque personne sur qui on clique
   * pouvoir envoyer une invitation depuis le profile de la personne
   * ***********************/

  useEffect(() => {
    // Simule la mise à jour des informations en temps réel
    const interval = setInterval(() => {
      setNewsInfo("Nouvelles informations en temps réel...");
    }, 5000); // Mettez à jour toutes les 5 secondes (ou ajustez selon vos besoins)

    return () => clearInterval(interval);
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{newsInfo}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => handlePostPress(item)}
    >
      {item.type === "photo" && (
        <Text style={styles.postText}>{item.content}</Text>
      )}
      {item.type === "video" && (
        <Text style={styles.postText}>{item.content}</Text>
      )}
      {/* Ajoutez d'autres types de publications au besoin */}
    </TouchableOpacity>
  );

  const handlePostPress = (post) => {
    // Ajoutez la logique pour afficher la publication sélectionnée
    console.log("Publication sélectionnée:", post);
  };

  return (
    <LinearGradient
      colors={["#fff", "#c8dbc8"]}
      style={styles.container}
    >
      <FlatList
        ListHeaderComponent={renderHeader}
        data={posts}
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
    paddingTop: 8,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  button: {
    backgroundColor: "rgba(255, 156, 51, 0.7)",
    padding: "15%",
    borderRadius: 5,
    margin: "5%", // Ajoutez un espace entre les boutons
    width: "100%", // Ajustez la largeur selon vos préférences
    alignItems: "center",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "#3498db", // Couleur de la barre d'informations en temps réel
  },
  headerText: {
    fontSize: 18,
    color: "#fff", // Couleur du texte dans la barre d'informations en temps réel
  },
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  postText: {
    fontSize: 18,
  },
});
