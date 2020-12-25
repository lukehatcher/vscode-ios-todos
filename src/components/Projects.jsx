import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import Todos from './Todos';

const ProjectStack = createStackNavigator();

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
    // height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    padding: 15,
    // flexDirection: 'row',
  },
});

export function Projects({ route, navigation }) {
  // console.log(route.params);
  // const { passedState } = route.params;
  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [ready, setReady] = useState(false); // only when
  const placeholder = 'jon doe';

  useEffect(() => {
    axios.get(`http://localhost:3001/api/projects/get/${placeholder}`)
      .then((response) => {
        setUserData(response.data);
        setReady(true);
        console.log('Projects.jsx useEffect fired');
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleProjectDeletion(projectString) {
    axios.delete('http://localhost:3001/api/projects/delete', {
      params: {
        type: 'project',
        username: 'jon doe', // hardcoded for now
        projectName: projectString,
        todo: null,
      },
    })
      .then(() => {
        const idx = userData.projects.findIndex((i) => i.projectName === projectString);
        userData.projects.splice(idx, 1);
        setUserData(userData);
        // update arbitrary state to force rerender
        const refresher = refresh + 1;
        setRefresh(refresher);
      })
      .catch((err) => {
        console.error('error deleting project', err);
      });
  }

  return (
    <View key={userData}>
      <ScrollView>
        {ready && userData.projects.map((item) => ( // MAJOR KEY
          <TouchableOpacity
            key={Math.random()}
            style={styles.view}
            onPress={() => navigation.navigate('Todos', { projectTodos: item })}
          >
            <Text style={styles.text}>{item.projectName}</Text>
            <Button
              title="X"
              onPress={(() => {
                handleProjectDeletion(item.projectName);
              })}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export function ProjectStackNavigation() {
  return (
    <ProjectStack.Navigator>
      <ProjectStack.Screen
        name="Projects"
        component={Projects}
      />
      <ProjectStack.Screen name="Todos" component={Todos} />
    </ProjectStack.Navigator>
  );
}
