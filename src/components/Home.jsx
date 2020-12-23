import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Button, TextInput, TouchableOpacity,
} from 'react-native';
import { getPixelSizeForLayoutSize } from 'react-native/Libraries/Utilities/PixelRatio';

const styles = StyleSheet.create({
  Home: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    padding: 15,
    // backgroundColor: '#181818',
  },
  text: {
    // fontSize: 25,
    // color: 'white',
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
