import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('username', value);
  } catch (err) {
    console.error(err);
  }
};

// storeData('luke hatcher');

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('username');
    if (value !== null) {
      return value;
    }
    return null;
  } catch (err) {
    console.error(err);
  }
};

export {
  storeData,
  getData,
};
