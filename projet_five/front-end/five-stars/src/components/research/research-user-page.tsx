import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NavBar from "../navigationBar/navigation";
import { GET_USERS } from "../query_and_mutation/query";
import { useQuery } from "@apollo/client";
import { styles } from "./styles";
import { renderModalUserItem } from "./modal-button";
import * as Animatable from "react-native-animatable";

export default function ResearchPage({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_USERS);
  const [Users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);

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
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.userInfo}
        onPress={() => handleUserPress(item)}
      >
        <View style={styles.row}>
          <Image
            source={require("./../../../images/user.png")}
            style={styles.avatar}
          />
          <Text style={styles.itemTextName}>{item.title}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.moreButton}
        // onPress={() => setSelectedUser(item)}
        onPress={() =>
          setDropdownVisible(dropdownVisible === item.id ? null : item.id)
        }
      >
        <Text style={styles.moreButtonText}>⋮</Text>
      </TouchableOpacity>
      {dropdownVisible === item.id && (
        <Animatable.View // Utilisation de Animatable.View pour l'animation d'apparition
          style={styles.dropdownMenu}
          animation="fadeIn" // Animation de fondu enchaîné
          duration={300} // Durée de l'animation en millisecondes
        >
          <TouchableOpacity onPress={() => handleUserMessagePress(item)}>
            <Text style={styles.menuItem}>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCloseMenu}>
            <Text style={styles.menuItem}>close</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );

  const handleUserPress = (User) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "PublicProfilPage", params: { UserId: User.id } }],
    });
    handleCloseMenu();
  };

  const handleUserMessagePress = (User) => {
    navigation.reset({
      index: 0,
      routes: [{ name: "ChatPage", params: { interlocuteurId: User.id } }],
    });
    handleCloseMenu();
  };

  const handleCloseMenu = () => {
    setSelectedUser(null);
    setDropdownVisible(null)
  };

  const handleRightButtonPress = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <LinearGradient colors={["#fff", "#fff"]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Trouver un user</Text>
        <View style={styles.rightHeader}>
          <TouchableOpacity onPress={handleRightButtonPress}>
            <Image
              source={require("./../../../images/add-friend.png")}
              style={styles.rightButtonImage}
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
              style={styles.flatList}
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