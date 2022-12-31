import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {WebView} from 'react-native-webview'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {  getExtra } from '../../utiles/api'

export default class NewsScreen extends Component {
  state={
    extra:{}
  }
  componentDidMount(){
    this.lodaData()
  }
  lodaData=()=>{
    getExtra(this.props.route.params.id)
    .then((res)=>{
      this.setState({
        extra:res
      })
    })
  }
  showData=()=>{
    console.log(this.state.extra.comments)
  }

  render() {
    return (
      <>
        <WebView
          source={{uri:this.props.route.params.url}}
        />
        <View style={styles.bottomTab} >
          <TouchableOpacity onPress={()=>this.props.navigation.goBack()} >
            <Ionicons name={'chevron-back-outline'} size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate('Comments',{extra:this.state.extra,id:this.props.route.params.id})} >
            <Ionicons name='chatbox-ellipses-outline' size={25} />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>this.showData()} >
            <Ionicons name='heart-outline' size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='star-outline' size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='arrow-redo-outline' size={25} />
          </TouchableOpacity>
        </View>
      </>
      
    )
  }
}

const styles = StyleSheet.create({
  bottomTab:{
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
    height:50,
  },
})