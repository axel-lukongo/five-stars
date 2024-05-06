import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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

  
  rightHeader: {
    position: "absolute",
    top: 50,
    right: 10,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },

  // Style pour le texte du bouton

  rightButtonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  modalContent: {
    width: "100%", // ajuster la largeur du contenu modal

    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  rightButtonImage: {
    width: 30, // Ajustez la largeur selon vos besoins
    height: 30, // Ajustez la hauteur selon vos besoins
    resizeMode: "contain", // Assurez-vous que l'image s'adapte correctement au conteneur
  },

  flatList: {
    width: "100%", // occuper toute la largeur de l'écran
  },

  modalUserItem: {
    paddingVertical: 10,
  },
  modalUserItemText: {
    fontSize: 5,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 20,
  },
  button2: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
