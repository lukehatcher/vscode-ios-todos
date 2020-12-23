import 'react-native-gesture-handler';
import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
// } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Home from './src/components/Home';
import Todos from './src/components/Todos';
import Stats from './src/components/Stats';

// const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         {/* routes: */}
//         <Stack.Screen name="Home" component={Home} options={{ title: 'Overview' }} />
//         <Stack.Screen name="Screen1" component={Screen1} options={{ title: 'Screen 1' }} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* routes: */}
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
        <Tab.Screen
          name="Todos"
          component={Todos}
          options={{
            title: 'Projects',
            tabBarIcon: ({ color, size }) => ( // destruc. default options
              <Ionicon name="list" size={size} color={color} />
            ),
          }}
        />
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
