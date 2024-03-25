import { StatusBar } from "expo-status-bar";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import NavBar from "../navigationBar/navigation";

export default function AddPage({ navigation }) {
  const handleButtonPress = (buttonName) => {
    // Ajoutez ici la logique à exécuter lorsque le bouton est pressé
    console.log(`Bouton ${buttonName} pressé`);
  };
  return (
    <ImageBackground
      source={require("./../../../images/image4.jpg")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Bouton 1")}
        >
          <Text>Cree une equipe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleButtonPress("Bouton 2")}
        >
          <Text>Recherche une equipe</Text>
        </TouchableOpacity>
      </View>

      <NavBar navigation={navigation} />

      <StatusBar style="auto" />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: "rgba(255, 156, 51, 0.7)",
    padding: "15%",
    borderRadius: 5,
    margin: "5%", // Ajoutez un espace entre les boutons
    width: "100%", // Ajustez la largeur selon vos préférences
    alignItems: "center",
  },
});
