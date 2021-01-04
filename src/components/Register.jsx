import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

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

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleAccountCreation(user, pass) {
    axios.post('http://localhost:3001/api/projects/init', {
      params: {
        username: user,
        password: pass,
      },
    })
      .then(() => {
        Alert.alert('Account created', 'return to login screen to proceed');
      })
      .catch((err) => {
        console.error(err);
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
          title="create account"
          onPress={() => {
            handleAccountCreation(username, password);
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
