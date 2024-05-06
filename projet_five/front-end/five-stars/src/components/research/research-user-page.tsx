import React, { useState, useEffect } from "react";
import {
  Button,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../navigationBar/navigation";
import { GET_USERS } from "../query_and_mutation/query";
import { useQuery } from "@apollo/client";

export default function ResearchPage({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_USERS);

  const [Users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    refetch();
    if (data && data.getUsers) {
      setUsers(
        data.getUsers.map((user) => ({ id: user.id, title: user.firstname }))
      );
    }
  }, [data, refetch]);

  const filteredUsers = Users.filter((User) =>
    User.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleUserPress(item)}
    >
      <View style={styles.row}>
        <Image
          source={require("./../../../images/user.png")}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.itemTextName}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleUserPress = (User) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "PublicProfilPage", params: { UserId: User.id } }],
    });
  };

  return (
    <LinearGradient 
      colors={["#fff", "#c8dbc8"]}
      style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Trouver un user</Text>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un utilisateur..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <NavBar navigation={navigation} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#c8dbc8",
  },
  searchInput: {
    height: 40,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    backgroundColor: "transparent",
  },
  pageTitle: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
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
    color: "black",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
});
