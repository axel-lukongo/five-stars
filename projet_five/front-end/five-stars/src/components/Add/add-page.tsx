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
import CreateTeam from "./create_team";
export default function AddPage({ navigation }) {
  const handleCreatTeam = () => {
    // Ajoutez ici la logique à exécuter lorsque le bouton est pressé
    // console.log(`Bouton ${buttonName} pressé`);
    navigation.reset({
      index: 0,
      routes: [{ name: "CreateTeam" }],
    });
  };

  const handleSearchTeam = () => {
    // Ajoutez ici la logique à exécuter lorsque le bouton est pressé
    // console.log(`Bouton ${buttonName} pressé`);
    navigation.reset({
      index: 0,
      routes: [{ name: "SearchTeam" }],
    });
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
          onPress={() => handleCreatTeam()}
        >
          <Text>Cree une equipe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleSearchTeam()}
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
