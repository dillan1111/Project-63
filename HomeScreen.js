import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements'

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
    getWord=async (word)=>{
        var searchKeyword = word.toLowerCase()
        var url = 'https://rupinwhitehatjr.github.io/dictionary/'+searchKeyword+".json"
        return fetch(url)
        .then((data) => {
            if (data.status === 200) {
                return data.json();
            } else {
                return null;
            }
        
        })
        .then((response)=>{
            var responseObject = response
            //var word = responseObject.word
            //var lexicalCategory = responseObject.results[0].lexicalEntries[0].lexicalCategory.text
            if(responseObject){
                var wordData = responseObject.defintions[0]
                var definition = wordData.description
                var lexicalCategory=wordData.wordtype
                this.setState({
                    "word": this.state.text,
                    "definition": definition,
                    "lexicalCategory": lexicalCategory
                })
            }else{
                this.setState({
                    "word": this.state.text,
                    "definition": "Not Found"
                })
            }

        })

    
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
                        {
                        this.state.isSearchPressed && this.state.definition === "Loading.."
                        ?this.state.definition
                        :""
                        }
                    </Text>
                        <View style={{justifyContent:'center',marginLeft:10}}>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailsTitle}>
                                Word: {" "}
                                </Text>
                                <Text style={{fontSize: 14}}>
                                {this.state.word}
                                </Text>
                            </View>
                            <View style={styles.detailsContainer}>
                                <Text style={styles.detailsTitle}>
                                Type: {" "}
                                </Text>
                                <Text style={{fontSize: 14}}>
                                {this.state.lexicalCategory}
                                </Text>
                                </View>
                            <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                                <Text style={styles.detailsTitle}>
                                Definitions: {" "}
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
        justifyContent: 'center'
    },
    inputBox:{
        width: '80%',
        marginTop: 20,
        borderWidth: 4,
        alignSelf: 'center',
        alignItems: 'center',
        height: 40
    },
    detailsContainer:{

    },
    detailsTitle:{
        color: 'orange',
        fontSize: 25

    },
    searchButton:{
        marginTop: 20,
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