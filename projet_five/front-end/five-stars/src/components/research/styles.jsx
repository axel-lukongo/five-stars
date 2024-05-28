import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 100,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: "#4E82DD",
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
    // flexDirection: "row",
    margin: 10, // Ajoute un espace entre les rectangles
    borderRadius: 10, // Pour arrondir les coins du rectangle
    backgroundColor: "#f0f0f0", // Couleur de fond du rectangle
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2, // Pour l'effet d'ombre sur Android
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
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

  moreButton: {
    marginLeft: 'auto',
    padding: 10,
  },
  moreButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  dropdownMenu: {
    position: "absolute",
    top: 40,
    right: 10,
    width: 100,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "black",
    textAlign: "center",
  },
});
