// helpers/TokenStorage.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "loginToken";

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const updateToken = async (newToken: string) => {
  await storeToken(newToken);
};

export const deleteToken = async () => {
  try {
    return await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};
