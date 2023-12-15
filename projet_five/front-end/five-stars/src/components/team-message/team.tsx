import { Button, FlatList, Image, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import ProfilPage from '../profile/profile-page';
import ResearchPage from '../research/research-page';
// import MessagePage from '../team-message/message-page';
import HomePage from '../home/home-page';
import AddPage from '../Add/add-page';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function TeamPage({navigation}){

	const [discussions, setDiscussions] = useState([
		{ id: '1', title: 'Discussion 1' },
		{ id: '2', title: 'Discussion 2' },
		{ id: '3', title: 'Discussion 3' },
		// Ajoutez autant d'éléments que nécessaire
	  ]);
	
	  const renderItem = ({ item }) => (
		<TouchableOpacity style={styles.itemContainer} onPress={() => handleDiscussionPress(item)}>
		  <Text style={styles.itemText}>{item.title}</Text>
		</TouchableOpacity>
	  );
	
	  const handleDiscussionPress = (discussion) => {
		// Ajoutez la logique pour naviguer vers la page de discussion spécifique
		console.log('Discussion sélectionnée:', discussion);
	  };

	return(
		
	<LinearGradient
		colors={['#1c1c1c', '#0C2E00']} // Assurez-vous que les couleurs sont correctement définies
		style={styles.container}
	 >
		  <FlatList
		  data={discussions}
		  renderItem={renderItem}
		  keyExtractor={(item) => item.id}
		/>

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
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		
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
	},
	itemContainer: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	  },
	  itemText: {
		fontSize: 18,
	},
  });