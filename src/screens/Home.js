import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, FlatList, ActivityIndicator} from 'react-native'
import ListItemComp from '../components/ListItemComp'
import axios from 'axios'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import _ from 'lodash';

export default class Home extends Component {
    constructor(){
        super();
        this.state={
            result: [],
            search: '',
            loading: false,
            error: false,
            handSearch: false,
        }
        this.Search = _.debounce(this.Search, 1000)
    }
    componentDidMount(){
        this.getTv();
    }

    onSearch=(key) =>{
        this.setState({
            loading: true,
            search: key
        })
        this.Search(key)
    }
    Search = async(key)=>{
        if(key && key.length>1){
        try{
            const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${key}`);
            this.setState({
                result: response.data,
                loading: false,
                error: false,
            })
        }catch(err){
            console.log(err);
            this.setState({
                loading: false,
                error: true,
            })
            return Alert.alert(
                'Error',
                'Error connection to server error',
                [{text: 'OK'}],
                {
                    cancelable: false
                }
            )
        }
    }
    }
    getTv= async()=>{
        try{
            const response = await axios.get('http://api.tvmaze.com/search/shows?q=naruto');
            this.setState({
                result: response.data,
                loading: false,
                error: false,
            })
        }catch(err){
            console.log(err);
            this.setState({
                loading: false,
                error: true,
            })
            return Alert.alert(
                'Error',
                'Error connection to server error',
                [{text: 'OK'}],
                {
                    cancelable: false
                }
            )
        }
    }
    render() {
        const {result, loading, error} = this.state
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('AddItemPage')}>
                    <View style={styles.btnAdd}>
                        <Text style={styles.textAdd}>Add Item</Text>
                    </View>
                </TouchableOpacity>
                <TextInput placeholder="Search" style={styles.search} onChangeText={(e)=>{this.onSearch(e)}}/>
                 {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                 ): error ? (
                     <Text>Error, Plaese try again</Text>
                 ): result.length< 1 ? (
                    <Text>No Series fount with keyboard</Text>
                 ):(
                    <FlatList
                    data={result}
                    renderItem={({ item }) => <ListItemComp data={item} />}
                        //  keyExtractor={item => item.id}
                    />
                 ) }
                 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
    },
    btnAdd: {
        height: 50,
        width: 130,
        borderRadius: 5,
        backgroundColor: 'salmon',
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    search: {
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 10,
    },
    textAdd: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',

    }
})