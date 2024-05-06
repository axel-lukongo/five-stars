import React, { useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
// modalFunctions.js
// const handleUserPress = (User) => {
//   navigation.reset({
//     index: 0,
//     routes: [{ name: "PublicProfilPage", params: { UserId: User.id } }],
//   });
// };

export const renderModalUserItem = ({ item }) => (
  <View
    style={styles.itemContainer}
    // onPress={() => toggleUserSelection(item)}
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
    {/* Ajouter les boutons sous chaque utilisateur */}
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Bouton 1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.buttonText}>Bouton 2</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// export const toggleUserSelection = (user, navigation) => {
//   console.log("===========>>>>>>  ",user)
//   navigation.reset({
//     index: 0,
//     routes: [{ name: "PublicProfilPage", params: { UserId: user.id } }],
//   });
  // const isSelected = selectedUsers.some(
  //   (selectedUser) => selectedUser.id === user.id
  // );

  // if (isSelected) {
  //   setSelectedUsers(
  //     selectedUsers.filter((selectedUser) => selectedUser.id !== user.id)
  //   );
  // } else {
  //   setSelectedUsers([...selectedUsers, user]);
  // }
// };
