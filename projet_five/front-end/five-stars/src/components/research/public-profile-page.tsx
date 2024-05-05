import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeUserData } from "../authentification/user_data_management";
import { GET_PROFILE_USER } from "../query_and_mutation/query";
import { useQuery } from "@apollo/client";

export default function PublicProfilPage({ navigation, route }) {
  const { UserId } = route.params;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const { loading, error, data } = useQuery(GET_PROFILE_USER, {
    variables: { id: UserId },
  });

  useEffect(() => {
    if (data && data.getUser) {
      setFirstname(data.getUser.firstname);
      setLastname(data.getUser.lastname);
    }
  }, [data]);

  const GoBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "ResearchPage" }],
    });
  };

  return (
    <LinearGradient colors={["#fff", "#c8dbc8"]} style={styles.container}>
      <View style={styles.topRight}>
        <Button title="<back" onPress={GoBack} />
      </View>
      <View style={styles.profileImageContainer}>
        <Image
          source={require("./../../../images/user.png")}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>
          {firstname} {lastname}
        </Text>
      </View>
      <View style={styles.bar} />
      <View style={styles.squareContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.square} />
          <View style={styles.square} />
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.square} />
          <View style={styles.square} />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topRight: {
    position: "absolute",
    top: 30,
    left: 0,
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
    color: "black",
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
