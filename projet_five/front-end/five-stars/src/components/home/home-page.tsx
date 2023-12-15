import { Button, FlatList, Image, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import ProfilPage from '../profile/profile-page';
import ResearchPage from '../research/research-page';
// import HomePage from '../home/home-page';
import AddPage from '../Add/add-page';
// import MessagePage from '../team-message/message-page';
import TeamPage from '../team-message/team';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomePage({navigation}){

	const [newsInfo, setNewsInfo] = useState('Informations en temps réel...');
  const [posts, setPosts] = useState([
    { id: '1', type: 'photo', content: 'Image 1' },
    { id: '2', type: 'video', content: 'Vidéo 1' },
    // Ajoutez autant de publications que nécessaire
  ]);


  /*************************
   * trouver un moyen d'afficher les photo et video de tous les gens de l'appli
   * afficher les information en temps reel des resultats de match 
   * acceder au profile de chaque personne sur qui on clique
   * pouvoir envoyer une invitation depuis le profile de la personne
   * ***********************/

  useEffect(() => {
    // Simule la mise à jour des informations en temps réel
    const interval = setInterval(() => {
      setNewsInfo('Nouvelles informations en temps réel...');
    }, 5000); // Mettez à jour toutes les 5 secondes (ou ajustez selon vos besoins)

    return () => clearInterval(interval);
  }, []);

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{newsInfo}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.postContainer} onPress={() => handlePostPress(item)}>
      {item.type === 'photo' && <Text style={styles.postText}>{item.content}</Text>}
      {item.type === 'video' && <Text style={styles.postText}>{item.content}</Text>}
      {/* Ajoutez d'autres types de publications au besoin */}
    </TouchableOpacity>
  );

  const handlePostPress = (post) => {
    // Ajoutez la logique pour afficher la publication sélectionnée
    console.log('Publication sélectionnée:', post);
  };

	return(
	<LinearGradient
		colors={['#1c1c1c', '#0C2E00']} // Assurez-vous que les couleurs sont correctement définies
		style={styles.container}
	>
			<FlatList
			ListHeaderComponent={renderHeader}
			data={posts}
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
		paddingTop: 8,
		// justifyContent: 'center',
		// alignItems: 'center',
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

	headerContainer: {
		padding: 16,
		backgroundColor: '#3498db', // Couleur de la barre d'informations en temps réel
	  },
	  headerText: {
		fontSize: 18,
		color: '#fff', // Couleur du texte dans la barre d'informations en temps réel
	  },
	  postContainer: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	  },
	  postText: {
		fontSize: 18,
	  },
  });