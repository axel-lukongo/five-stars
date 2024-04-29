import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const { loading, error, data, refetch } = useQuery(GET_TEAMS); // Utilisez refetch pour recharger les données
  const [teamList, setTeamList] = useState([]);

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
          <View style={styles.content}>
            <FlatList
              data={teamList}
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
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemTextName: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default SearchTeam;
