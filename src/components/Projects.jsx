import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Todos from './Todos';

const ProjectStack = createStackNavigator();

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'row',
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
  },
  plusButton: {
    alignItems: 'center',
    padding: 15,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function Projects({ navigation }) {
  const placeholder = 'jon doe';
  const [userData, setUserData] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [ready, setReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');

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

  function handleProjectAddition(projectString) {
    axios.post('http://localhost:3001/api/projects/post', {
      type: 'project',
      username: 'jon doe', // hard coded username for now
      projectName: projectString,
      todo: null,
    })
      .then(() => {
        const newProject = {
          projectName: projectString,
          todos: [],
        };
        userData.projects.push(newProject);
        setUserData(userData);
        // triggers rerender (redundant)
        const refresher = refresh + 1;
        setRefresh(refresher);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <ScrollView>
      <View key={userData}>
        <ScrollView>
          {ready && userData.projects.map((item) => (
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
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Ionicon name="add-circle" size={34} />
        </TouchableOpacity>
        {/* ============ conditional add-project modal ============ */}
        <Modal
          style={styles.modal}
          animationType="slide"
          visible={modalVisible}
        >
          <View style={styles.modal}>
            <TextInput
              style={styles.input}
              onChangeText={(input) => setText(input)}
              placeholder="add your new todo"
            />
            <TouchableOpacity>
              <Button
                title="submit"
                onPress={() => {
                  setModalVisible(false);
                  handleProjectAddition(text);
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Button
                style={styles.button}
                title="cancel"
                onPress={() => {
                  setModalVisible(false);
                }}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

export function ProjectStackNavigation() {
  return (
    <ProjectStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
      }}
    >
      <ProjectStack.Screen
        name="Projects"
        component={Projects}
      />
      <ProjectStack.Screen name="Todos" component={Todos} />
    </ProjectStack.Navigator>
  );
}
