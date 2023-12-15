import { useState } from "react";
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";


export default function Authentification({navigation}){
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	
	const handleConnexion = () => {
		console.log('username: ', username);
		console.log('password: ', password);
	}
	return(
		<KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
			<ImageBackground
			source={require('./../../../images//image2.jpeg')}
				style={{flex: 1,
				justifyContent: 'center'
			}}>
				<View style={styles.formContainer}>

					<Text style={{color: '#ffff', fontSize: 20, right:100 }}> Pseudo </Text>
					<TextInput
					style={styles.input}
					placeholder='Usernames'
					onChangeText={text => setUsername(text)}
					value={username}/>

					<Text style={{color: '#ffff', fontSize: 20, right:80 }}> Mot de passe </Text>
					<TextInput
					style={styles.input}
					placeholder='Mots de passe'
					onChangeText={text => setPassword(text)}
					value={password}/>

					<TouchableOpacity
					style={styles.button}
					onPress={handleConnexion}>
						<Text style={styles.buttonText}> Connexion </Text>
					</TouchableOpacity>

					<TouchableOpacity
					style={styles.goBackButton}
					onPress={() => navigation.goBack()}>
						<Text style={styles.goBackButtonText}>Retour</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		</KeyboardAvoidingView>

	)
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
	},
	formContainer: {
		alignItems: 'center',
		
	},
	goBackButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.7)',
		padding: '2%',
		borderRadius: 5,
		marginTop: 10,
	},
	goBackButtonText: {
		color: 'black',
		fontSize: 18,
		textAlign: 'center',
	},
	button: {
		backgroundColor: 'green',
		padding: '2%',
		borderRadius: 5,
		marginTop: 10,
	},
	  buttonText: {
		color: 'white',
		fontSize: 18,
		textAlign: 'center',
	},
	input: {
		height: 40,
		width: '80%',
		borderColor: 'gray',
		borderWidth: 1,
		marginVertical: 10,
		paddingHorizontal: 10,
		borderRadius: 15,
		backgroundColor: 'white',
	},
})