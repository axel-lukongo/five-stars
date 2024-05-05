import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import WelcomPage from "./src/components/authentification/first-page";
import SignUpPage from "./src/components/authentification/sign-up-page";
import ConnexionPage from "./src/components/authentification/connexion-page";
import AddPage from "./src/components/Add/add-page";
import ProfilPage from "./src/components/profile/profile-page";
import HomePage from "./src/components/home/home-page";
import ResearchPage from "./src/components/research/research-page";
import MessagePage from "./src/components/team-message/chat-page";
import ChatList from "./src/components/team-message/chat-list-page";
import CreateTeam from "./src/components/Add/create_team";
const Stack = createStackNavigator();
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import ChatPage from "./src/components/team-message/chat-page";
import SearchTeam from "./src/components/Add/search_team";
import PublicProfilPage from "./src/components/research/public-profile-page";

// Configurez votre client Apollo
const client = new ApolloClient({
  uri: "http://localhost:8000/graphql", // Remplacez par l'URL de votre serveur GraphQL
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelcomPage"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="WelcomPage" component={WelcomPage} />
          <Stack.Screen name="SignUpPage" component={SignUpPage} />
          <Stack.Screen name="ConnexionPage" component={ConnexionPage} />
          <Stack.Screen name="AddPage" component={AddPage} />
          <Stack.Screen name="ProfilPage" component={ProfilPage} />
          <Stack.Screen name="PublicProfilPage" component={PublicProfilPage} />
          <Stack.Screen name="HomePage" component={HomePage} />
          <Stack.Screen name="ResearchPage" component={ResearchPage} />
          <Stack.Screen name="MessagePage" component={MessagePage} />
          <Stack.Screen name="ChatList" component={ChatList} />
          <Stack.Screen name="ChatPage" component={ChatPage} />
          <Stack.Screen name="CreateTeam" component={CreateTeam} />
          <Stack.Screen name="SearchTeam" component={SearchTeam} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
