import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class PostNew extends React.Component {

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

  render() {
    return (
      <View>
        <Text>Novas Postagens!!!</Text>
      </View>
    );
  }
}
