import 'react-native-gesture-handler';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Home from './src/components/Home';
import { ProjectStackNavigation } from './src/components/Projects';
import Stats from './src/components/Stats';

// const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

export default function App() {
  // const [username, setUsername] = useState('jon doe'); // will hardcode this for now
  // const [userData, setUserData] = useState([]);
  // const placeholder = 'jon doe';

  // useEffect(() => {
  //   axios.get(`http://localhost:3001/api/projects/get/${placeholder}`)
  //     .then((response) => {
  //       setUserData(response.data);
  //       console.log('App.jsx use effect fired');
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => ( // destruc. default options
              <Ionicon name="home" size={size} color={color} />
            ),
          }}
        />
        {/* ================================================== */}
        <Tab.Screen
          name="Projects"
          // initialParams={{ passedState: userData }} // userData is from effect
          component={ProjectStackNavigation} // projects stack
          options={{
            title: 'Projects',
            tabBarIcon: ({ color, size }) => ( // destruc. default options
              <Ionicon name="list" size={size} color={color} />
            ),
          }}
        />
        {/* ================================================== */}
        <Tab.Screen
          name="Stats"
          component={Stats}
          options={{
            title: 'Stats',
            tabBarIcon: ({ color, size }) => ( // destruc. default options
              <Ionicon name="analytics" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
