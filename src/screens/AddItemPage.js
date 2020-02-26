import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Picker, Alert, Image } from 'react-native'
import ImagePicker from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

export default class AddItemPage extends Component {
    constructor(){
        super();
        this.state = {
            id_category: 1,
            avatarSource: null,
            name: '',
            description: '',
            price: '',
            stock: 0,
            loading: false,
            image: null,
        }
    }
    handleChoosePhoto = () =>{
        const options = {
            title: 'Select Avatar',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };

          ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                const source = { uri: response.uri };
                this.setState({
                    image: source,
                    avatarSource: response,
                });
              }
            // }
          });
    }
    handleAdd= async()=>{
        if(this.state.avatarSource){
            this.setState({
                loading: true
            })
            console.warn(this.state.avatarSource.uri)
            const dataFile = new FormData()
            dataFile.append('name', this.state.name)
            dataFile.append('description', this.state.description)
            dataFile.append('price', this.state.price)
            dataFile.append('stock', this.state.stock)
            dataFile.append('image', {
                uri: this.state.avatarSource.uri,
                type: 'image/jpeg',
                name: this.state.avatarSource.fileName
            })
            dataFile.append('id_category', this.state.id_category)                                                                                                                                                                                                                                                                                                                                                                                
            await axios.post('http://192.168.100.10:4001/api/v1/product', dataFile)
            .then(()=>{
                this.setState({
                    loading: false
                })
                Alert.alert('add sukses');
                this.props.navigation.navigate('Home')
            })
            .catch(()=>{
                Alert.alert('add gagal ')
            })
        }else{
            Alert.alert('silahkan upload fotonya terlebih dahulu')
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                <Text style={styles.title}> Add Item </Text>
                <TextInput style={styles.field} placeholder="Nama Item" onChangeText={(name)=>this.setState({name})} /> 
                <TextInput style={styles.field} placeholder="description" onChangeText={(description)=>this.setState({description})} /> 
                <TextInput style={styles.field} placeholder="Price" onChangeText={(price)=>this.setState({price})} /> 
                <TextInput style={styles.field} placeholder="Stock" onChangeText={(stock)=>this.setState({stock})} />
                <TouchableOpacity onPress={()=> this.handleChoosePhoto()}>
                <View style={styles.sectionImage}>
                    <View style={styles.upload}>
                        <Text style={styles.txtupload}>Upload Image</Text>
                    </View>
                <Image source={this.state.image} style={{width: 80, height: 80, marginRight: 80, borderRadius: 5, marginTop: 10}} />
                </View>
                </TouchableOpacity>
                <Picker
                    selectedValue={this.state.id_category}
                    style={{height: 50, width: 200, marginTop: 15}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({id_category: itemValue})
                    }>
                        <Picker.Item label="Makanan" value="1" />
                        <Picker.Item label="Minuman" value="2" />
                </Picker>
                <TouchableOpacity onPress={()=>this.handleAdd()}>
                <View style={styles.btnAdd}>
                    <Text style={styles.txtAdd}>Add</Text>
                </View>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'salmon',
        color: 'white'
    },
    form: {
        // backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
    },
    title: {
        fontSize: 24,
        marginBottom: 30
    },
    field: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'grey',
        marginBottom: 20,
        height: 45,
        borderRadius: 8,
        fontSize: 16,
    },
    upload: {
        height: 40,
        width: 120,
        backgroundColor: 'salmon',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 10,
    },
    txtupload: {
        fontSize: 16,
    },
    btnAdd: {
        width: '80%',
        height: 50,
        backgroundColor: 'grey',
        borderRadius: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    txtAdd: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    sectionImage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})

