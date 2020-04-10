import React, { Component, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { View, Text, TextInput, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import {NavigationEvents} from 'react-navigation';



export default class Explorar extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading : true,
      perfis : [],
    }

    this.getItems();
  }

  async getItems(){
    fetch('http://192.168.5.25:3000/posts')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading : false,
        perfis : responseJson,
      });
    }).catch((error) =>{
      alert(error);
    });
  }

  render() {

    if (this.state.isLoading){
      return(
       <View style={{flex: 1, padding: 20}}>
         <ActivityIndicator/>
       </View>
     )
   }

    return (
     
      <View>
        <NavigationEvents onDidFocus={()=>this.getItems()}/>
        <View style={styles.flex}>
          <Icon
            style={styles.searchIcon}
            name="search1"
            size={20}
            color="#424242"
          />
          <TextInput style={styles.input} placeholder="Pesquisar" />
          <Text style={styles.cancel}>Cancel</Text>
        </View>
        {/* TODO pesquisar com um map, ao colocar um nome que existe, 
          mostrar a foto da pessoa, do contrário mostrar "nao encontrado.."
        */}

        <ScrollView>
          <FlatList
            data={this.state.perfis}
            renderItem={({item}) => (
              <TouchableOpacity style={{ flex: 1, flexDirection: 'column', margin: 1 }}>
                <Image source = {{uri: item.linkfotoperfil}} style = {styles.image_perfil_size}/>
              </TouchableOpacity>
            )}
            
            numColumns={3}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15
  },
  searchIcon: {
    padding: 8.5,
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  cancel: {
    fontSize: 18,
    fontWeight: '600'
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    width: 300,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    marginRight: 20
  },
  image_perfil_size: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  mainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
});
