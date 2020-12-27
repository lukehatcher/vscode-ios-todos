import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Login({ route, navigation }) {
  const { setState } = route.params;
  return (
    <View style={styles.view}>
      <TextInput
        placeholder="username"
      />
      <TextInput
        placeholder="password"
      />
      <TouchableOpacity>
        <Button
          title="submit"
          onPress={() => {
            setState(true);
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
