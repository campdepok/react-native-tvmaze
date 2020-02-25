import React from 'react'
import { View, Text } from 'react-native'
import Home from '../../screens/Home';
import Login from '../../screens/Login';
import AddItemPage from '../../screens/AddItemPage';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

const Stack = createStackNavigator();
const MainNavigators = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode='none'>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="AddItemPage" component={AddItemPage} /> 
          {/* <Stack.Screen name="Login" component={Login} options={{headerShown: false}} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default MainNavigators
