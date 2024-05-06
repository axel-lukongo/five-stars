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
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../navigationBar/navigation";
import { GET_USERS } from "../query_and_mutation/query";
import { useQuery } from "@apollo/client";
import { styles } from "./styles";
import { renderModalUserItem } from "./modal-button";

export default function ResearchPage({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [Users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const handleRightButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <LinearGradient colors={["#fff", "#c8dbc8"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Trouver un user</Text>
        <View style={styles.rightHeader}>
          <TouchableOpacity onPress={handleRightButtonPress}>
              <Image
                source={require("./../../../images/add-friend.png")} // Remplacez le chemin par le chemin de votre image
                style={styles.rightButtonImage} // Assurez-vous de définir un style pour votre image
              />
           </TouchableOpacity>
        </View>
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


      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              style={styles.flatList} // Ajoutez cette ligne pour appliquer le style
              data={filteredUsers}
              renderItem={renderModalUserItem}
              keyExtractor={(item) => item.id}
            />
            <TouchableOpacity onPress={handleCloseModal}>
              <Text>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <NavBar navigation={navigation} />
    </LinearGradient>
  );
}
