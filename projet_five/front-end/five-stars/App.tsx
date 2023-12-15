import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import FirstPage from './src/components/authentification/first-page';
import SignUp from './src/components/authentification/sign-up-page';
import Authentification from './src/components/authentification/connexion-page';
import AddPage from './src/components/Add/add-page';
import ProfilPage from './src/components/profile/profile-page';
import HomePage from './src/components/home/home-page';
import ResearchPage from './src/components/research/research-page';
import MessagePage from './src/components/team-message/message-page';
import TeamPage from './src/components/team-message/team';

const Stack = createStackNavigator();
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// Configurez votre client Apollo
const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql', // Remplacez par l'URL de votre serveur GraphQL
  cache: new InMemoryCache(),
});

export default function App() {
  return (
	<ApolloProvider client={client}>
		<NavigationContainer>
		<Stack.Navigator initialRouteName="Page d'entree">
			<Stack.Screen name="Page d'entree" component={FirstPage} />
			<Stack.Screen name="SignUp" component={SignUp} />
			<Stack.Screen name="Authentification" component={Authentification} />
			<Stack.Screen name="AddPage" component={AddPage} />
			<Stack.Screen name="ProfilPage" component={ProfilPage} />
			<Stack.Screen name="HomePage" component={HomePage} />
			<Stack.Screen name="ResearchPage" component={ResearchPage} />
			<Stack.Screen name="MessagePage" component={MessagePage} />
			<Stack.Screen name="TeamPage" component={TeamPage} />
		</Stack.Navigator>
		</NavigationContainer>
	</ApolloProvider>
  );
}



