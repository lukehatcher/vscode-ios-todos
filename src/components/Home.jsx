import React from 'react';
import {
  View, Text, StyleSheet, Button,
} from 'react-native';

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
});

export default function Home({ navigation }) {
  return (
    <View style={styles.Home}>
      <Text style={styles.text}>txt from home</Text>
      {/* <Button
        title="navigate to Todos"
        onPress={() => {
          navigation.navigate('Todos', {
            id: Math.random(),
            content: 'this is some content',
          });
        }}
      /> */}
    </View>
  );
}
