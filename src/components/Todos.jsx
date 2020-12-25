import axios from 'axios';
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

export default function Todos({ route }) {
  const { projectTodos } = route.params;
  const [todosState, setTodosState] = useState([]);
  // needed random state change to refresh with leaving screen, setTodosState was not working
  const [refresh, setRefresh] = useState(1);
  const [ready, setReady] = useState(false); // true when api call finished

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

  return (
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
    </View>
  );
}
