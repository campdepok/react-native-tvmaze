import React from 'react'
import { View, Text } from 'react-native'
import Home from '../../screens/Home';
import Login from '../../screens/Login';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();
const MainNavigators = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" headerMode='none'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default MainNavigators
