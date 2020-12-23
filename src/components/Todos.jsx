import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  todos: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Todos({ route }) {
  // const { id, content } = route.params;
  // console.log(id, content);
  return (
    <View style={styles.todos}>
      <Text>here are my projects folders</Text>
    </View>
  );
}
