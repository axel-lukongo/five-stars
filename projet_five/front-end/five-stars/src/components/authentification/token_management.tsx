import AsyncStorage from "@react-native-async-storage/async-storage";
// import jwt from "jsonwebtoken";
import { LOGIN } from "../query_and_mutation/mutation";
import { useMutation } from "@apollo/client";
// import { verify } from "expo-jwt";
// import { jwtDecode } from "jwt-decode";
// import jwt from 'jsonwebtoken';
// import {jwtDecode} from "jwt-decode";
// import * as jwt from 'expo-jwt';
// import jwt from 'jsonwebtoken';
import JWT from "expo-jwt";
import { useEffect } from "react";

//I save the token in the local storage
export const SaveToken = (token: string) => {
  const saveToken = async () => {
    try {
      await AsyncStorage.setItem("accessToken", token);
      console.log("token successfully saved");
    } catch (error) {
      console.error("Erreur lors de la gestion des tokens :", error);
    }
  };

  saveToken();
};

export const isValidToken = async (token) => {
  try {
    const decodedToken = JWT.decode(token, "jetestuneclefsecret");
    const expirationTime = decodedToken.exp * 1000;
    const isTokenValid = expirationTime > Date.now();
    return true;
  } catch (error) {
    console.log("error: ", error);
    return false;
  }
};

export const GetToken = async () => {
  try {
    const token = await AsyncStorage.getItem("accessToken");
    return token;
  } catch (error) {
    console.error("Erreur lors de la récupération du token :", error);
  }
};
