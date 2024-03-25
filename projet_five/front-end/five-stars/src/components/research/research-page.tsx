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

export default function ResearchPage({ navigation }) {
  return <NavBar navigation={navigation} />;
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
