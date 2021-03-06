import React, { useState } from 'react';
import {
  View, TextInput, StyleSheet, Button, TouchableOpacity, LogBox, Alert,
} from 'react-native';
import axios from 'axios';
import { persistLoginInfo } from '../auth';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: 300,
    borderRadius: 20,
    paddingLeft: 15,
    margin: 15,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

export default function Login({ route, navigation }) {
  const { setState, setStorage } = route.params;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  function handleLoginValidation(user, pass) {
    axios.get('http://localhost:3001/api/projects/validate', {
      params: {
        userName: user,
        passWord: pass,
      },
    })
      .then(async (response) => {
        // if db user/pass validation returns true
        if (response.data) {
          try {
            await persistLoginInfo(username, password);
            setStorage(true);
            setState(true);
            // update
          } catch (err) {
            console.error(err);
          }
        } else {
          Alert.alert('Invalid username or password', 'please try again');
        }
      })
      .catch((err) => {
        console.error('error validating login', err);
      });
  }

  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        placeholder="username"
        onChangeText={(text) => {
          setUsername(text);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        onChangeText={(text) => {
          setPassword(text);
        }}
      />
      <TouchableOpacity>
        <Button
          title="login"
          onPress={() => {
            handleLoginValidation(username, password);
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <Button
          title="create an account"
          onPress={() => {
            navigation.navigate('register', { setState });
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
