import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, FlatList, ActivityIndicator} from 'react-native'
import ListItemComp from '../components/ListItemComp'
import axios from 'axios'
import { TextInput } from 'react-native-gesture-handler';
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
        console.warn(this.props.route.params.data);
        console.warn('hello')
        const {result, loading, error} = this.state
        return (
            <View style={styles.container}>
                <TextInput placeholder="Search" onChangeText={(e)=>{this.onSearch(e)}}/>
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
        flex: 1
    }
})