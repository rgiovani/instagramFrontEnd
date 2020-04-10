import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Image, SafeAreaView, ScrollView} from 'react-native';
import {NavigationEvents} from 'react-navigation';


import Icon from 'react-native-vector-icons/Feather';
import Post from '../post';

export default class Feed extends React.Component {
  static navigationOptions = {
    title: 'Feed',
  }

  constructor(props){
    super(props);
    this.state = {
      isLoading : true,
      post : [],
    }

    this.getItems();
  }

  async getItems(){
    fetch('http://192.168.5.25:3000/posts')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        isLoading : false,
        post : responseJson,
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
      <ScrollView> 
            <NavigationEvents onDidFocus={()=>this.getItems()}/>
            
            <TouchableOpacity style={styles.adicionar_Postagem} onPress= {()=>{
              Post.navigationOptions.title = 'Nova Postagem'
              this.props.navigation.navigate('Postagens', {id: null, linkfotoperfil: '', nome: '', descricaodopost: '', imagemdopost: ''})}
            }>
              <Icon name="user-plus" size={25} color="#FFFFFF" />
            </TouchableOpacity>
            
            {
            this.state.post.map((item) =>{
              
              return (
                
                  <TouchableOpacity key={item.id} onPress= {()=>{
                    Post.navigationOptions.title = item.nome
                    this.props.navigation.navigate('Postagens', {id: item.id, nome: item.nome,  linkfotoperfil: item.linkfotoperfil, descricaodopost: item.descricaodopost, imagemdopost: item.imagemdopost})} 
                  }>
                    
                    <View style = {styles.header_post}> 

                      <TouchableOpacity>
                        <Image source = {{uri: item.linkfotoperfil}} style = {styles.image_perfil_size}/>
                      </TouchableOpacity>

                      <TouchableOpacity style = {{flex: 1}}>
                        <View style = {{paddingLeft : 7}}>
                          <Text style = {styles.title_post}>{item.nome}</Text>
                        </View>
                      </TouchableOpacity>
                          
                      <TouchableOpacity style = {styles.more_post_option_position}>
                        <Icon name="more-horizontal" color="black" size={19}/>
                      </TouchableOpacity>
                    </View>
                  
                    <View>
                      <Image source = {{uri: item.imagemdopost}} style = {styles.image_post_size}/> 
                    </View>

                    <View style = {{padding: 20}}/>
                    <View style = {styles.line}/>
                  </TouchableOpacity>
                
              )
            }, {props: this.props})
            }
         
            <View style = {{padding: 39}}/>
           
      </ScrollView> 
    );

  }

}



const styles = StyleSheet.create({
  image_perfil_size: {
    height: 50,
    width: 50,
    borderRadius: 100
  },

  title_post: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  desciption_post: {
    fontSize: 11,
    paddingLeft: 5
  },

  more_post_option_position:{
    flexDirection: 'row-reverse',
    marginEnd: 12,
  },

  image_post_size : {
    height: 310,
    width: '100%',
    
  },

  header_post: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 10,
    marginHorizontal: 7,
    
  },

  line : {
    padding: 0.4,
    width: '100%',
    backgroundColor: '#F1F2F2',
  },

  adicionar_Postagem: {
    marginTop: 12, 
    borderRadius: 100,
    backgroundColor: '#FF9A8B', 
    padding: 10, 
    alignSelf: 'center', 
  },
  
})

