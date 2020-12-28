import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, Button, TouchableOpacity,
} from 'react-native';
import auth from '../auth';

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  text: {
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
  },
  loginButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
  },
});

export default function Home({ route }) {
  const { setLoggedInState, setStorage } = route.params;
  const [username, setUsername] = useState('');

  useEffect(() => {
    (async function f() {
      try {
        const currentUser = await auth.retreiveLoggedInUser();
        setUsername(currentUser);
      } catch (err) {
        console.error(err);
      }
    }());
  }, []);

  return (
    <View style={styles.Home}>
      <Text>
        Welcome
        {` ${username}`}
      </Text>
      <TouchableOpacity>
        <Button
          title="logout"
          onPress={() => {
            (async function fx() {
              try {
                await auth.logoutUser();
                setUsername('');
                // and navigate back to homescreen
                setStorage(false);
                setLoggedInState(false);
              } catch (err) {
                console.error(err);
              }
            }());
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
