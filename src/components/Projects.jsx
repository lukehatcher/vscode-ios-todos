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
                // delete todo
              })}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

export function ProjectStackNavigation({ route }) {
  // const { passedState } = route.params;
  return (
    <ProjectStack.Navigator>
      <ProjectStack.Screen
        name="Projects"
        component={Projects}
        // initialParams={{ passedState: passedState }}
      />
      <ProjectStack.Screen name="Todos" component={Todos} />
    </ProjectStack.Navigator>
  );
}
