import React from 'react'
import { View, KeyboardAvoidingView, ScrollView, Text, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native'


const Login = (props) => {
    console.log(props)
  const handleClick=()=>{
    Alert.alert(
      'jangan di klik'
    )
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.sectionTitle}>
        <Text style={{fontSize:30, color: 'grey'}}>hello world</Text>
      </View>
      <View style={styles.sectionForm}>
      <TextInput style={[styles.input, styles.username]} placeholder="Username"/>
      <TextInput style={[styles.input, styles.password]} placeholder="Password"/>
      </View>
      <View style={styles.sectionButton}>
      <TouchableOpacity onPress={()=>{props.navigation.navigate('Home',{data: 'ini data'})
      }}
       >
      <View style={styles.button}>
        <Text style={styles.fontLogin}>Login</Text>
      </View>
       </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  sectionTitle: {
    flex:2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
  },
  sectionForm: {
    flex:3,
    paddingLeft: 10,
    paddingRight: 10,
  },
  sectionButton: {
    flex:1,
    alignItems: 'center',
    paddingTop: 100
  },
  input: {
    backgroundColor: '#1b9094',
    color: 'white',
    borderRadius: 10,
    fontSize: 20,
  },
  username: {
    marginTop: 100,
  },
  password: {
    marginTop: 30,
  },
  button: {
    width: 250,
    height: 50,
    borderRadius: 5,
    backgroundColor: '#1b9094',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontLogin: {
    fontSize: 23,
    fontWeight: 'bold',
    color: 'white',
  }
})

export default Login
