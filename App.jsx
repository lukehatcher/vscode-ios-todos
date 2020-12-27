import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Home from './src/components/Home';
import { ProjectStackNavigation } from './src/components/Projects';
import Stats from './src/components/Stats';
import Login from './src/components/Login';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function Tabs() {
  return (
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
  );
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (!loggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ header: () => null }}
            initialParams={{ setState: setLoggedIn }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  // else if logged in...
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
