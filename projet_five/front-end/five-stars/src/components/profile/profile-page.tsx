import { Button, Image, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
// import ProfilPage from '../profile/profile-page';
import ResearchPage from '../research/research-page';
import HomePage from '../home/home-page';
import AddPage from '../Add/add-page';
// import MessagePage from '../team-message/message-page';
import { LinearGradient } from 'expo-linear-gradient';
import TeamPage from '../team-message/team';

export default function ProfilPage({navigation}){
	return(


		/****************
		 * il faudra une variable pour le nombre de match, nombre de victoir et defaite
		 * ajouter une photo de profile
		 * trouver comment partager photo et video
		****************/


	<LinearGradient
		colors={['#1c1c1c', '#0C2E00']} // Assurez-vous que les couleurs sont correctement définies
		style={styles.container}
	 >
		{/* Photo de profil centrée en haut */}
		<View style={styles.profileImageContainer}>
		  <Image
			source={require('./../../../images/user.png')}
			style={styles.profileImage}
		  />
		</View>
  
		{/* Nom et prénom */}
		<View style={styles.nameContainer}>
		  <Text style={styles.nameText}>Prénom Nom</Text>
		</View>
		<View style={styles.bar} />
  
		{/* Carrés en deux lignes et deux colonnes */}
		<View style={styles.squareContainer}>
		  {/* Première ligne */}
		  <View style={styles.rowContainer}>
			<View style={styles.square} />
			<View style={styles.square} />
		  </View>
		  
		  {/* Deuxième ligne */}
		  <View style={styles.rowContainer}>
			<View style={styles.square} />
			<View style={styles.square} />
		  </View>
		</View>

		<View style={styles.navigation_Bar}>
				<TouchableOpacity onPress={() => navigation.navigate(ResearchPage)}>
					<Image
					source={require('./../../../images/magnifying-glass.png')}
					style={styles.emoticone}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate(AddPage)}>
					<Image
					source={require('./../../../images/add.png')}
					style={styles.emoticone}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate(HomePage)}>
					<Image
					source={require('./../../../images/home.png')}
					style={styles.emoticone}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate(TeamPage)}>
					<Image
					source={require('./../../../images/chat.png')}
					style={styles.emoticone}
					/>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => navigation.navigate(ProfilPage)}>
					<Image
					source={require('./../../../images/avatar.png')}
					style={styles.emoticone}
					/>
				</TouchableOpacity>
			</View>
	</LinearGradient>

	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// width: '100%',
	},
	navigation_Bar: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		borderRadius: 25,
		padding: '5%',
		width: '80%', // Ajustez la largeur selon vos préférences
		position: 'absolute',
		bottom: 30,
	},
	emoticone:{
		width: 30, // Ajustez la largeur selon vos préférences
		height: 30,
		marginRight: '12%', // Ajoutez un espace entre les colonnes
	},
	profileImageContainer: {
		marginTop: -80,
	  },
	  profileImage: {
		width: 150,
		height: 150,
		borderRadius: 50,
	  },
	  nameContainer: {
		marginTop: 10,
	  },
	  nameText: {
		fontSize: 20,
		fontWeight: 'bold',
	  },
	  squareContainer: {
		marginTop: 50,
		alignItems: 'center',  // Centrer les carrés horizontalement

	  },
	  rowContainer: {
		flexDirection: 'row',
		marginBottom: 10,
	  },
	  bar: {
		width: '70%', // Ajustez la largeur selon vos préférences
		borderBottomWidth: 1,
		borderBottomColor: 'gray', // Couleur de la barre
		marginVertical: 10, // Espace au-dessus et en dessous de la barre
	},
	  square: {
		width: 50,
		height: 50,
		padding: '22%',
		backgroundColor: 'black',  // Couleur de fond du carré
		margin: 5,
		borderRadius: 20,
		
	  },
  });