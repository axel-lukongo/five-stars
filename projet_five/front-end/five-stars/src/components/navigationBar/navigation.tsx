import React from "react";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function NavBar({ navigation }) {
  return (
    <View style={styles.navigation_Bar}>
      <TouchableOpacity onPress={() => navigation.navigate("ResearchPage")}>
        <Image
          source={require("./../../../images/magnifying-glass.png")}
          style={styles.emoticone}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("AddPage")}>
        <Image
          source={require("./../../../images/add.png")}
          style={styles.emoticone}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("HomePage")}>
        <Image
          source={require("./../../../images/home.png")}
          style={styles.emoticone}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("TeamPage")}>
        <Image
          source={require("./../../../images/chat.png")}
          style={styles.emoticone}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ProfilPage")}>
        <Image
          source={require("./../../../images/avatar.png")}
          style={styles.emoticone}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navigation_Bar: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 25,
    padding: "5%",
    width: "80%",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  emoticone: {
    width: 30,
    height: 30,
    marginRight: "12%",
  },
});
