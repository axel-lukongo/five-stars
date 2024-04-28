import AsyncStorage from "@react-native-async-storage/async-storage";


// SaveUserData function is used to store user's data (username, password, firstname, lastname) in the AsyncStorage
export const SaveUserData = (username: string, password: string, firstname: string, lastname: string, userId: number) => {
  const saveData = async () => {
    try {
      await AsyncStorage.setItem("Username", username);
      await AsyncStorage.setItem("Password", password);
      await AsyncStorage.setItem("Firstname", firstname);
      await AsyncStorage.setItem("Lastname", lastname);
      await AsyncStorage.setItem("UserId", userId.toString());
      console.log("data successfully saved");
    } catch (error) {
      console.error("Erreur lors de la gestion des username et password :", error);
    }
  };

  saveData();
};


// removeUserData function is used to delete user's data (username, password, firstname, lastname) from the AsyncStorage
export const removeUserData = () => {
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("Username");
      await AsyncStorage.removeItem("Password");
      await AsyncStorage.removeItem("Firstname");
      await AsyncStorage.removeItem("Lastname");
      console.log("data successfully saved");
    } catch (error) {
      console.error("Erreur lors de la gestion des username et password :", error);
    }
  };

  removeData();
};
