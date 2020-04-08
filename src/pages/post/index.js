import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';




export default class Post extends React.Component {
constructor(props){
  super(props);

  this.state = {
   id: props.navigation.getParam('id', null),
   nome: props.navigation.getParam('nome', null), 
   linkfotoperfil: props.navigation.getParam('linkfotoperfil', null), 
   descricaodopost: props.navigation.getParam('descricaodopost', null), 
   imagemdopost: props.navigation.getParam('imagemdopost', null), 
  }
}

salvarDados(){
  let operacao = 'POST';
  let linkFetch = 'http://192.168.5.25:3000/posts'; 
  if (this.state.id){
    operacao = 'PUT';
    linkFetch = 'http://192.168.5.25:3000/posts' + '/' + this.state.id;
  }
  fetch(linkFetch, {
    method: operacao,
    headers:{
      Accept: 'application/json',
      'Content-type':'application/json'
    },
    body: JSON.stringify({
      nome: this.state.nome,
      linkfotoperfil: this.state.linkfotoperfil,
      descricaodopost: this.state.descricaodopost,
      imagemdopost: this.state.imagemdopost
    })
  }).then((retorno) => {
      if(retorno.status == 201 || retorno.status == 200){
        alert('Sucesso.');
        this.voltarNaListagem();
      }
  
  })
}

voltarNaListagem(){
  this.props.navigation.goBack();
}


  render() {
    return (
      <View>
          
        <View style={{marginHorizontal: 15, marginVertical: 15}}>
          
          <Text style = {styles.descricaoDoTextoDosCampos}>Nome: </Text>
          <TextInput 
          style={styles.campoTextInput}
          onChangeText = { text => this.setState({
            nome: text
          }) } 
          value ={this.state.nome}
          />
          <Text style = {styles.descricaoDoTextoDosCampos}>URL da foto de perfil: </Text>
          <TextInput 
          style={styles.campoTextInput}
          onChangeText = { text => this.setState({
            linkfotoperfil: text
          }) } 
          value ={this.state.linkfotoperfil}
          />

          
          <Text style = {styles.descricaoDoTextoDosCampos}>Descricao da postagem: </Text>
          <TextInput 
          style={styles.campoTextInput}
          onChangeText = { text => this.setState({
            descricaodopost: text
          }) } 
          value ={this.state.descricaodopost}
          />

          <Text style = {styles.descricaoDoTextoDosCampos}>Url da imagem da postagem: </Text>
          <TextInput 
          style={styles.campoTextInput}
          onChangeText = { text => this.setState({
            imagemdopost: text
          }) } 
          value ={this.state.imagemdopost}
          />


          <TouchableOpacity style = {styles.botaoSalvarPostagem} onPress = {() => this.salvarDados()}> 
            <Icon name = "check" size ={20} color = '#FFFFFF'/>
          </TouchableOpacity>

        </View> 
       
        <View style = {styles.header_post}> 
          <TouchableOpacity>
            <Image source = {{uri: this.state.linkfotoperfil}} style = {styles.image_perfil_size}/>
          </TouchableOpacity>
      
          <View style = {{flex: 1}}>
            <TouchableOpacity style = {{paddingLeft : 7}}>
              <Text style = {styles.title_post}>{this.state.nome}</Text>
            </TouchableOpacity>
                      
            <View style = {styles.desciption_position}>
              <Text style = {styles.desciption_post}>{this.state.descricaodopost}</Text>
            </View>    
          </View>

          {/* <TouchableOpacity style = {styles.more_post_option_position}>
            <Icon name="more-horizontal" color="black" size={19}/>
          </TouchableOpacity> */}
        </View>
                
        <TouchableOpacity>
          <Image source = {{uri: this.state.imagemdopost}} style = {styles.image_post_size}/> 
        </TouchableOpacity>

        <View style = {{padding: 20}}/>
          <View style = {styles.line}/>
      </View>
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
    backgroundColor: '#2398AB', 
    padding: 20, 
    fontSize: 20, 
    alignSelf: 'center', 
    color: 'white'
  },
  campoTextInput: {
    height:40, 
    borderColor: '#D1D3D4', 
    borderBottomWidth: 1, 
    borderRadius: 10,
  },
  botaoSalvarPostagem:{
    marginVertical: 5,
    alignSelf: 'flex-end', 
    height: 40,
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#FF9A8B', 
  },
  descricaoDoTextoDosCampos:{
    color: '#FF7272', 
    fontWeight: 'bold',
    marginTop: 6,
  }
})
