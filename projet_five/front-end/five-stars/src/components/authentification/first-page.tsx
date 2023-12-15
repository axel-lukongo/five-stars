import { StatusBar } from 'expo-status-bar';
import { Button, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import SignUp from './sign-up-page';
import Authentification from './connexion-page';


export default function FirstPage({navigation}) {
  return (

	<ImageBackground
		source={require('./../../../images/image1.jpg')}
		style={{flex: 1,
			justifyContent: 'center'
		}}>

		<View style={{flex:1,justifyContent:'center',alignItems: 'center'}}>
			<TouchableOpacity
			style={{backgroundColor: 'orange',
			padding: '1%',
			top: '25%',
			borderRadius: 15,
			}}
			onPress={() => {
			navigation.navigate(Authentification)}}>
				<Text style={styles.buttonText} > connexion </Text>
			</TouchableOpacity>

			<TouchableOpacity
			style={{backgroundColor: 'gray',
			padding: '1%',
			top: '28%',
			borderRadius: 15,
			}}
			onPress={() => {
			navigation.navigate(SignUp)}}>
				<Text style={styles.buttonText} > s'inscrire </Text>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	</ImageBackground>

  );
}

const styles = StyleSheet.create({
  buttonText: {
    color: 'black',
    fontSize: 38,
	textAlign: 'center',
  },
});
