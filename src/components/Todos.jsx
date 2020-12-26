import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  TextInput,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

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
  plusButton: {
    alignItems: 'center',
    padding: 15,
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // input: {
  //   height: 40,
  //   borderColor: 'gray',
  //   borderWidth: 1,
  //   borderRadius: 20,
  //   paddingLeft: 15,
  // },
});

export default function Todos({ route }) {
  const { projectTodos } = route.params;
  const [todosState, setTodosState] = useState([]);
  // needed random state change to refresh with leaving screen, setTodosState was not working
  const [refresh, setRefresh] = useState(1);
  const [ready, setReady] = useState(false); // true when api call finished
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');

  useEffect(() => {
    setTodosState(projectTodos);
    setReady(true);
  }, []);

  function handleTodoDelete(todoString) {
    axios.delete('http://localhost:3001/api/projects/delete', {
      params: {
        type: 'todo',
        username: 'jon doe', // hard coded username for now
        projectName: todosState.projectName,
        todo: todoString,
      },
    })
      .then(() => {
        const idx = todosState.todos.findIndex((i) => i === todoString);
        todosState.todos.splice(idx, 1);
        // doesnt trigger rerender for some reason
        setTodosState(todosState);
        // triggers rerender (redundant)
        const refresher = refresh + 1;
        setRefresh(refresher);
      })
      .catch((err) => {
        console.error('error deleting todo', err);
      });
  }

  function handleTodoAddition(todoString) {
    axios.post('http://localhost:3001/api/projects/post', {
      type: 'todo',
      username: 'jon doe', // hard coded username for now
      projectName: todosState.projectName,
      todo: todoString,
    })
      .then(() => {
        todosState.todos.push(todoString);
        setTodosState(todosState);
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
      <View key={todosState}>
        <ScrollView key={todosState}>
          {ready && todosState.todos.map((item) => (
            <TouchableOpacity key={Math.random()} style={styles.view}>
              <Text style={styles.text}>{item}</Text>
              <Button
                title="X"
                onPress={(() => {
                  handleTodoDelete(item);
                })}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => {
            setModalVisible(true); // pass param
          }}
        >
          <Ionicon name="add-circle" size={34} />
        </TouchableOpacity>
        {/* ============ modal ============ */}
        <Modal
          style={styles.modal}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            // set state for refresh?
          }}
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
                  handleTodoAddition(text);
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
