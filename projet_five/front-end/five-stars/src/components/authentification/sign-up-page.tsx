import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../query_and_mutation/mutation";
import { GetToken, SaveToken } from "./token_management";
import { LOGIN } from "../query_and_mutation/mutation";
import { SaveUserData } from "./user_data_management";

export default function SignUpPage({ navigation }) {
  // Mutations for user creation and login
  const [createAccesToken, { loading, error }] = useMutation(LOGIN);
  const [createUser, { loading: loadingCreateUser, error: loadingError }] =
    useMutation(CREATE_USER);

  // Local state for form inputs
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to create a user with given inputs
  const handleCreatUser = async () => {
    try {
      // Call the createUser mutation
      const result = await createUser({
        variables: {
          firstname,
          lastname,
          username,
          // email,
          password,
        },
      });
      console.log(result);

      // Call the login mutation to obtain an access token
      const token = await createAccesToken({
        variables: {
          username,
          password,
        },
      });

      // Check if the login was successful
      if (token.data && token.data.login !== "failed") {
        // Save the access token and information of the user
        SaveToken(token.data.login.accessToken);
        SaveUserData(username, password, firstname, lastname, result.data.creatUser);
        // Reset the navigation stack and navigate to HomePage
        navigation.reset({
          index: 0,
          routes: [{ name: "ProfilPage" }],
        });
        return;
      }
    } catch (mutationError) {
      console.error("Erreur de mutation :", mutationError);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ImageBackground
        source={require("./../../../images/image2.jpeg")}
        style={styles.background}
      >
        <Text style={styles.Title}>cree ton compte</Text>

        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="nom"
            onChangeText={(text) => setFirstname(text)}
            value={firstname}
          />
          <TextInput
            style={styles.input}
            placeholder="prenom"
            onChangeText={(text) => setLastname(text)}
            value={lastname}
          />
          <TextInput
            style={styles.input}
            placeholder="usernames"
            onChangeText={(text) => setUsername(text)}
            value={username}
          />
          {/* <TextInput
					style={styles.input}
					placeholder='email'
					onChangeText={text => setEmail(text)}
					value={email}/> */}
          <TextInput
            style={styles.input}
            placeholder="mots de passe"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          <TouchableOpacity style={styles.button} onPress={handleCreatUser}>
            <Text style={styles.buttonText}>s'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.goBackButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  formContainer: {
    alignItems: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "green",
    padding: "2%",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
  goBackButton: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "2%",
    borderRadius: 5,
    marginTop: 10,
  },
  goBackButtonText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
  },
  Title: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    top: "-4%",
  },
});
