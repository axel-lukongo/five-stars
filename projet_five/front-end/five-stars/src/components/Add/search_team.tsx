import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GET_TEAMS } from "../query_and_mutation/mutation";
import { useQuery } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";

const SearchTeam = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(GET_TEAMS);
  const [teamList, setTeamList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    refetch();
    if (data && data.getTeams) {
      setTeamList(
        data.getTeams.map((team) => ({ id: team.id, title: team.teamName }))
      );
    }
  }, [data, refetch]);

  const handleGoBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "AddPage" }],
    });
  };

  const filteredTeamList = teamList.filter(
    team => team.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleDiscussionPress(item)}
    >
      <View style={styles.row}>
        <View>
          <Text style={styles.itemTextName}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleDiscussionPress = (discussion) => {
    // Traitement à effectuer lorsqu'un élément de la liste est pressé
  };

  return (
    <ImageBackground
      source={require("./../../../images/image4.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Button title="<Back" onPress={handleGoBack} />
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.pageTitle}>Team list</Text>
            </View>
            <View style={styles.headerLeft}></View>
          </View>

          {/* Barre de recherche */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une équipe..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <View style={styles.content}>
            <FlatList
              data={filteredTeamList}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  titleContainer: {
    flex: 3,
  },
  pageTitle: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  teamName: {
    fontSize: 16,
    marginBottom: 10,
    color: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemContainer: {
    padding: 40,
    margin: 20, // Ajoute un espace entre les rectangles
    borderRadius: 10, // Pour arrondir les coins du rectangle
    backgroundColor: "rgba(255, 255, 255, 0.1)", // Couleur de fond du rectangle
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2, // Pour l'effet d'ombre sur Android
  },
  itemTextName: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "rgba(255, 255, 255, 0.0)",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default SearchTeam;
