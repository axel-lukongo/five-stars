import { StatusBar } from "expo-status-bar";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import SignUpPage from "./sign-up-page";
import ConnexionPage from "./connexion-page";
import { GetToken, SaveToken } from "./token_management";
import { useEffect } from "react";
import { isValidToken } from "./token_management";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../query_and_mutation/mutation";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomPage({ navigation }) {
  const [createAccesToken, { loading, error }] = useMutation(LOGIN);

  // Implement the useEffect hook to check for a valid token and redirect to the HomePage if available.
  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      const token = await GetToken();
      const username = await AsyncStorage.getItem("Username");
      const password = await AsyncStorage.getItem("Password");
      // const username = "asd"
      // Check if a token and username are available.
      if (token && username) {
        const isvalide = await isValidToken(token);

        // If the token is invalid, refresh it using user credentials.
        if (isvalide === false) {
          try {
            const result = await createAccesToken({
              variables: {
                username,
                password,
              },
            });

            // If the login failed, display an error message.
            if (result.data && result.data.login === "failed") {
              console.error("La connexion failed.");
              return;
            }

            console.log("the token has been refresh");
            // attention a bien donner uniquement le token sinon l'application crash!!!
            SaveToken(result.data.login.accessToken);
          } catch (mutationError) {
            console.error("Erreur de mutation :", mutationError);
            return;
          }
          // Utiliser le nouveau token, par exemple, le sauvegarder dans l'état global
        }

        // Redirect to the HomePage if the token is valid.
        navigation.reset({
          index: 0,
          routes: [{ name: "ProfilPage" }],
        });
      }
      return;
    };

    checkTokenAndRedirect();
  }, []);

  return (
    <ImageBackground
      source={require("./../../../images/image1.jpg")}
      style={{ flex: 1, justifyContent: "center" }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity
          style={{
            backgroundColor: "orange",
            padding: "1%",
            top: "25%",
            borderRadius: 15,
          }}
          onPress={() => {
            navigation.navigate(ConnexionPage);
          }}
        >
          <Text style={styles.buttonText}> connexion </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "gray",
            padding: "1%",
            top: "28%",
            borderRadius: 15,
          }}
          onPress={() => {
            navigation.navigate(SignUpPage);
          }}
        >
          <Text style={styles.buttonText}> s'inscrire </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: "black",
    fontSize: 38,
    textAlign: "center",
  },
});
