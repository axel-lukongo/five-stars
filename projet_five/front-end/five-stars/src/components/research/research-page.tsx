import { Button, Image, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import ProfilPage from '../profile/profile-page';
// import ResearchPage from '../research/research-page';
import HomePage from '../home/home-page';
import AddPage from '../Add/add-page';
// import MessagePage from '../team-message/message-page';
import TeamPage from '../team-message/team';

export default function ResearchPage({navigation}){
	return(
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
	)
}


const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	button: {
		backgroundColor: 'rgba(255, 156, 51, 0.7)',
		padding: '15%',
		borderRadius: 5,
		margin: '5%', // Ajoutez un espace entre les boutons
		width: '100%', // Ajustez la largeur selon vos préférences
		alignItems: 'center',
	},
	navigation_Bar: {
		flexDirection: 'row',
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		borderRadius: 25,
		padding: '5%',
		width: '80%', // Ajustez la largeur selon vos préférences
		position: 'absolute',
		bottom: 30,	},
	emoticone:{
		width: 30, // Ajustez la largeur selon vos préférences
		height: 30,
		marginRight: '12%', // Ajoutez un espace entre les colonnes
	}
  });