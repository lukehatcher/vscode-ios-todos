import React from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
} from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Todos from './Todos';

const ProjectStack = createStackNavigator();

const styles = StyleSheet.create({
  projects: {
    paddingTop: 60,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  project: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    // width: '100%',
    // alignSelf: 'stretch',
    backgroundColor: 'white',
  },
});

export function Projects({ route, navigation}) {
  // const { id, content } = route.params;
  // console.log(id, content);
  const ex = [{ projectName: 'app1' }, { projectName: 'app2' }, { projectName: 'app3' }];
  return (
    <View style={styles.projects}>
      <FlatList
        data={ex}
        keyExtractor={(item) => (item._id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item._id}
            style={styles.project}
            onPress={() => navigation.navigate('Todos')}
          >
            <Text key={item._id}>{item.projectName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export function ProjectStackNavigation() {
  return (
    <ProjectStack.Navigator>
      <ProjectStack.Screen name="Projects" component={Projects} />
      <ProjectStack.Screen name="Todos" component={Todos} />
    </ProjectStack.Navigator>
  );
}
