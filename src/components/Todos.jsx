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
  const [ready, setReady] = useState(false); // only when
  // setTodosState(projectTodos);

  function fetchTodos() {
    // update and rerender
  }

  useEffect(() => {
    setTodosState(projectTodos);
    setReady(true);
  }, []);
  return (
    <View key={todosState}>
      {console.log('rendered todos list')}
      {console.log(todosState)}
      <ScrollView key={todosState}>
        {ready && todosState.todos.map((item) => (
          <TouchableOpacity key={Math.random()} style={styles.view}>
            <Text style={styles.text}>{item}</Text>
            <Button
              title="X"
              onPress={(() => {
                axios.delete('http://localhost:3001/api/projects/delete', {
                  params: {
                    username: 'jon doe',
                    projectName: todosState.projectName,
                    todo: item,
                  },
                })
                  .then(() => {
                    const oldTodos = todosState.todos;
                    const idx = oldTodos.findIndex((i) => i === item);
                    todosState.todos.splice(idx, 1);
                    setTodosState(todosState);
                  })
                  .catch((err) => {
                    console.error('error deleting', err);
                  });
              })}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
