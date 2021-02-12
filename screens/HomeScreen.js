import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements'
import dictionary from '../database'

export default class HomeScreen extends Component {
    constructor(){
        super();
        this.state = {
            text: '',
            isSearchPressed: false,
            word: "",
            lexicalCategory: '',
            examples: [],
            definition: ""

        }
    }
    getWord=async (text)=>{
        var text = text.toLowerCase()
        try{
            var word = dictionary[text]["word"]
            var lexicalCategory = dictionary[text]["lexicalCategory"]
            var definition = dictionary[text]["definition"]
            this.setState({
                "word":word,
                "lexicalCategory": lexicalCategory,
                "definition": definition
            })
        }
        catch(err){
            alert("Sorry This word is not available for now")
            this.setState({
                'text': '',
                'isSearchPressed': false
            })
        }
    
    }
    render() {
        return(
            <View>
                <Header 
                    backgroundColor={'#CD00FF'}
                    centerComponent={{text: 'Pocket Dictionary', style:{color: '#cfaf', fontSize:20}}}/>

                <TextInput
                    style={styles.inputBox}
                    onChangeText={text => {
                        this.setState({
                            text:text, 
                            isSearchPressed: false,
                            word: "Loading...",
                            lexicalCategory: '',
                            examples: [],
                            definition: ""
                        });
                    }}
                    value={this.state.text}
                />
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={() => {
                        this.setState({isSearchPressed: true})
                        this.getWord(this.state.text)
                    }}>
                        <Text style={{fontSize:18}}>Search</Text>
                </TouchableOpacity>
                <View style={styles.outputContainer}>
                    <Text style={{fontSize:20}}>
                        {
                        this.state.isSearchPressed && this.state.word === "Loading.."
                        ?this.state.word
                        :""
                        }
                    </Text>
                        <View style={{justifyContent:'center',marginLeft:10}}>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailsTitle}>
                                Word: {" "}
                                </Text>
                                <Text style={{fontSize: 14, marginTop:-27, marginLeft:85}}>
                                {this.state.word}
                                </Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailsTitle}>
                                Type: {" "}
                                </Text>
                                <Text style={{fontSize: 14, marginTop:-27, marginLeft:85 }}>
                                {this.state.lexicalCategory}
                                </Text>
                                </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                <Text style={styles.detailsTitle}>
                                Definition: {" "}
                                </Text>
                                
                                <Text style={{fontSize: 14}}>
                                {this.state.definition}
                                </Text>
                            </View>
                        </View>
                </View>

                
            </View>
        );

    }

}
const styles= StyleSheet.create({
    container:{
        flex: 1,
    },
    inputBoxContainer:{
        flex:0.3,
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center'
    },
    inputBox:{
        marginTop: 60,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
    
    },
    detailsContainer:{
        

    },
    detailsTitle:{
        color: 'orange',
        fontSize: 25

    },
    searchButton:{
        marginTop: 40,
        borderWidth: 1,
        borderRadius: 10,
        width:'40%',
        height: 30,
        alignItems: 'center',
        marginLeft:'30%'


    },
    outputContainer:{

    }
})