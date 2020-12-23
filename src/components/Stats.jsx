import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  stats: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Stats() {
  return (
    <View style={styles.stats}>
      <Text>github stats here</Text>
      <Text>commit streak/app post streak</Text>
      <Text>other cool github stats? idk</Text>

    </View>
  );
}
