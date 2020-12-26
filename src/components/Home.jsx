import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Button, TextInput, TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    justifyContent: 'center',
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

export default function Home({ navigation }) {
  const [text, setText] = useState('');
  return (
    <View style={styles.Home}>
      <TextInput
        style={styles.input}
        onChangeText={(input) => setText(input)}
        placeholder="username"
        // value={value}
      />
      <Text style={styles.text}>{text}</Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          navigation.navigate('Projects'); // ===== projects stack
        }}
      >
        <Text style={{textAlign: 'center'}}>login</Text>
      </TouchableOpacity>
    </View>
  );
}
