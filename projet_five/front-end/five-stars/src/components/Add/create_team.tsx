import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { CREATE_TEAM } from "../query_and_mutation/mutation";
import { useMutation } from "@apollo/client";

const CreateTeamForm = ({ navigation }) => {
  const [teamName, setTeamName] = useState("");
  const [userId, setUserId] = useState("");
  const [createTeam, { loading, error }] = useMutation(CREATE_TEAM);

  useEffect(() => {
    const getUserId = async () => {
      setUserId(await AsyncStorage.getItem("UserId"));
    };
    getUserId();
  }, [userId]);

  const handleCreateTeam = async () => {
    // Code pour envoyer les données du formulaire à l'API ou au backend
    try {
      const { data } = await createTeam({
        variables: {
          ownerId: parseInt(userId),
          teamName: teamName,
        },
      });
      console.log("Team created:", data.createTeam);
      handleGoBack();
    } catch (error) {
      console.error("Error creating team:", error);
    }
  };

  const handleGoBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "AddPage" }],
    });
  };

  return (
    <ImageBackground
      source={require("./../../../images/image4.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.label}>Team Name:</Text>

          <TextInput
            style={styles.input}
            value={teamName}
            onChangeText={setTeamName}
            placeholder="Enter Team Name"
            placeholderTextColor="white" // Couleur du texte du placeholder
          />

          <Button title="Create Team" onPress={handleCreateTeam} />

          <Button title="Go Back" onPress={handleGoBack} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Couleur de la superposition semi-transparente
  },
  label: {
    fontSize: 25,
    marginBottom: 5,
    color: "white", // Couleur du texte
  },
  input: {
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    color: "white", // Couleur du texte
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // ou 'contain' pour ajuster l'image à la taille du conteneur
    justifyContent: "center",
  },
});

export default CreateTeamForm;
