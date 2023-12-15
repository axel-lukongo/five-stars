import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USERS } from '../query_and_mutation/query'
import { CREATE_USER } from '../query_and_mutation/mutation';


export default function SignUp({navigation}) {
	// const { loading, error, data } = useQuery(GET_USERS);
	const [createUser, { loading, error }] = useMutation(CREATE_USER);

	const [firstname, setFirstname] = useState('')
	const [lastname, setLastname] = useState('')
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleCreatUser = async () => {
		try {
			const result = await createUser({
				variables: {
					firstname,
					lastname,
					username,
					// email,
					password,
				}
			})
			console.log(result);
		} catch(mutationError){
			console.error("Erreur de mutation :", mutationError);
		}
	}

	const handleSignup = () => {
		// console.log("=======>>>>>>>  ", data, "  <<<<<<<========")

		console.log('Nom: ', firstname);
		// console.log('prenom: ', lastname);
		console.log('username: ', username);
		// console.log('email: ', email);
		// console.log('password: ', password);
	}

	return(
		<KeyboardAvoidingView style={styles.container} behavior='padding' enabled>

			<ImageBackground 
			source={require('./../../../images/image2.jpeg')}
			style={styles.background}>
				<Text style={styles.Title}>cree ton compte</Text>

				<View style={styles.formContainer}>
					<TextInput
					style={styles.input}
					placeholder='nom'
					onChangeText={text => setFirstname(text)}
					value={firstname}/>
					<TextInput
					style={styles.input}
					placeholder='prenom'
					onChangeText={text => setLastname(text)}
					value={lastname}/>
					<TextInput
					style={styles.input}
					placeholder='usernames'
					onChangeText={text => setUsername(text)}
					value={username}/>
					{/* <TextInput
					style={styles.input}
					placeholder='email'
					onChangeText={text => setEmail(text)}
					value={email}/> */}
					<TextInput
					style={styles.input}
					placeholder='mots de passe'
					onChangeText={text => setPassword(text)}
					value={password}/>

					<TouchableOpacity
					style={styles.button}
					onPress={handleCreatUser}>
						<Text style={styles.buttonText}>s'inscrire</Text>
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
	background:{
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center'
	},
	container: {
		flex: 1,
	},
	formContainer: {
		alignItems: 'center',
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
	Title: {
		color: 'white',
		fontSize: 30,
		textAlign: 'center',
		top: '-4%',
	},
})