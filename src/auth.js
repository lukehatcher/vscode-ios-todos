import AsyncStorage from '@react-native-async-storage/async-storage';

export async function persistLoginInfo(username, password) {
  try {
    await AsyncStorage.multiSet([['username', username], ['token', password]]);
  } catch (err) {
    console.error(err);
  }
}

export async function retreiveLoggedInUser() {
  try {
    const username = await AsyncStorage.getItem('username');
    if (username !== null) {
      return username;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
}

export async function logoutUser() {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.error(err);
  }
}
