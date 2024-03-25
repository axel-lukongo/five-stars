/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   profile-page.tsx                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: alukongo <alukongo@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2024/03/08 19:49:12 by alukongo          #+#    #+#             */
/*   Updated: 2024/03/25 13:57:36 by alukongo         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

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
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { removeUserData } from "../authentification/user_data_management";
import NavBar from "../navigationBar/navigation";

export default function ProfilPage({ navigation }) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  useEffect(() => {
    const getinfo = async () => {
      setFirstname(await AsyncStorage.getItem("Firstname"));
      setLastname(await AsyncStorage.getItem("Lastname"));
    };

    getinfo();
  }, [firstname]);
  const logOut = () => {
    removeUserData();
    navigation.reset({
      index: 0,
      routes: [{ name: "WelcomPage" }],
    });
    // Implement your logout logic here
  };
  return (
    /****************
     * il faudra une variable pour le nombre de match, nombre de victoir et defaite
     * ajouter une photo de profile
     * trouver comment partager photo et video
     ****************/

    <LinearGradient
      colors={["#1c1c1c", "#0C2E00"]} // Assurez-vous que les couleurs sont correctement définies
      style={styles.container}
    >
      {/* Ajoutez le bouton en haut à droite */}
      <View style={styles.topRight}>
        <Button title="Log out" onPress={logOut} />
      </View>
      {/* Photo de profil centrée en haut */}
      <View style={styles.profileImageContainer}>
        <Image
          source={require("./../../../images/user.png")}
          style={styles.profileImage}
        />
      </View>

      {/* Nom et prénom */}
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>
          {" "}
          {firstname} {lastname}
        </Text>
      </View>
      <View style={styles.bar} />

      {/* Carrés en deux lignes et deux colonnes */}
      <View style={styles.squareContainer}>
        {/* Première ligne */}
        <View style={styles.rowContainer}>
          <View style={styles.square} />
          <View style={styles.square} />
        </View>

        {/* Deuxième ligne */}
        <View style={styles.rowContainer}>
          <View style={styles.square} />
          <View style={styles.square} />
        </View>
      </View>

      <NavBar navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // paddingBottom: 100, // Assurez-vous que cela est suffisant pour rendre toute la navbar visible
    // width: '100%',
  },
  topRight: {
    position: "absolute",
    top: 30,
    right: 0,
    padding: 10,
  },
  profileImageContainer: {
    marginTop: -80,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  nameContainer: {
    marginTop: 10,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  squareContainer: {
    marginTop: 50,
    alignItems: "center", // Centrer les carrés horizontalement
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  bar: {
    width: "70%", // Ajustez la largeur selon vos préférences
    borderBottomWidth: 1,
    borderBottomColor: "gray", // Couleur de la barre
    marginVertical: 10, // Espace au-dessus et en dessous de la barre
  },
  square: {
    width: 50,
    height: 50,
    padding: "22%",
    backgroundColor: "black", // Couleur de fond du carré
    margin: 5,
    borderRadius: 20,
  },
});
