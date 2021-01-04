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
import { retreiveLoggedInUser } from '../auth';

retreiveLoggedInUser()
  .then((response) => {
    console.log(response);
    CURRENT_USER = response;
  })
  .catch((err) => {
    console.error(err);
  });

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
    fontSize: 20,
    flex: 1,
    padding: 15,
  },
  textCompleted: {
    textDecorationLine: 'line-through',
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

export default function Todos({ route }) {
  const { projectTodos } = route.params;
  const [todosState, setTodosState] = useState([]);
  // needed random state change to refresh with leaving screen, setTodosState was not working
  const [refresh, setRefresh] = useState(1);
  const [ready, setReady] = useState(false); // true when api call finished
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  let CURRENT_USER;

  useEffect(() => {
    retreiveLoggedInUser()
      .then((response) => {
        CURRENT_USER = response;
        setTodosState(projectTodos); // passed in from projects load
        setReady(true);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function handleTodoDelete(todoString) { // should still work
    axios.delete('http://localhost:3001/api/projects/delete', {
      params: {
        type: 'todo',
        username: CURRENT_USER,
        projectName: todosState.projectName,
        todo: todoString,
      },
    })
      .then(() => {
        const idx = todosState.todos.findIndex((todo) => todo.text === todoString); // edited
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
      username: CURRENT_USER,
      projectName: todosState.projectName,
      todo: todoString,
    })
      .then(() => {
        const todoObj = {
          text: todoString,
          commpleted: false,
        };
        todosState.todos.push(todoObj);
        setTodosState(todosState);
        // triggers rerender (redundant)
        const refresher = refresh + 1;
        setRefresh(refresher);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleTodoCompletion(todoString) {
    axios.put('http://localhost:3001/api/projects/put', {
      type: 'todo',
      username: CURRENT_USER,
      projectName: todosState.projectName,
      todo: todoString,
    })
      .then(() => {
        // update state
        const idx = todosState.todos.findIndex((item) => item.text === todoString);
        todosState.todos[idx].completed = !todosState.todos[idx].completed;

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
              {/* conditional styling (line through) */}
              <Text style={item.completed ? styles.textCompleted : styles.text}>
                {item.text}
              </Text>
              <Button
                title="🗑"
                onPress={(() => {
                  handleTodoDelete(item.text);
                })}
              />
              <Button
                title="✅"
                onPress={(() => {
                  handleTodoCompletion(item.text);
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
        >
          <View style={styles.modal}>
            <TextInput
              style={styles.input}
              onChangeText={(input) => setText(input)}
              placeholder="add your new todo"
              multiline
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
