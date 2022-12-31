import { Text, StyleSheet, View, ScrollView, Image, Button, Dimensions, TouchableOpacity, FlatList, SectionList, ImageBackground } from 'react-native'
import React, { Component } from 'react'

import {  getLatest, getBefore } from '../../utiles/api'
import Swiper from 'react-native-swiper'


export  default class HomeScreen extends Component {
  state = {
    opacity: 1,
    latest: {},
    list:[],
    oldestDate: 0,
    date: new Date(),
    isGet: false,
    isFresh: false,
    isEnd: false,
    }
  componentDidMount() {
    this.freshData()
   }

  showState = ()=>{
    console.log('latest',this.state.latest)
  }

  freshData=()=>{
    getBefore.bind(this)
    getLatest.bind(this)
    getLatest().then(res => {
      this.setState({
        latest:res,
        list: res.stories,
        isGet: true,
      })
    })
    .then(()=>{
      let date = this.state.latest.date
      getBefore(date)
      .then(res=>{
        let temp = this.state.list.push(...res.stories)
        this.setState({
          oldestDate: res.date,
        })
      })
    })
  }
  refreshData=()=>{
    this.freshData.bind(this)
  }

  loadData=()=>{
    getBefore.bind(this)
    getBefore(this.state.oldestDate)
    .then(({stories})=>{
      this.state.list.push(...stories)
    })
    .then(()=>{
      getBefore(this.state.oldestDate-1)
      .then(({stories})=>{
        this.state.list.push(...stories)
      })
    })
    .then(()=>{
      getBefore(this.state.oldestDate-2)
      .then(res=>{
        this.state.list.push(...res.stories)
        this.setState({
          oldestDate: res.date,
        })
      })
    })
  }

  showData=()=>{
    console.log(this.state.list)
  }

  renderItem = ({ item }) =>{

    return  (
      <TouchableOpacity 
        keyExtractor={item.id} 
        key={item.id}
        style={[styles.itemContainer]}
        onPress={()=>this.props.navigation.navigate('News',{url:item.url,id:item.id})}
      >
        <View style={styles.itemTextContainer} >
          <Text numberOfLines={2} style={styles.itemTitle} >{item.title}</Text>
          <View>
            <Text style={styles.itemHint} >{item.hint}</Text>
          </View>
        </View>
        <Image source={{uri:item.images[0]}} style={styles.itemImage} />
      </TouchableOpacity> 
    )}

  render() {
    return (  
      <>
      {
        !this.state.isGet ?
        <Text>加载中</Text>
        :
        (
        <FlatList
          data={this.state.list}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          refreshing={this.state.isFresh}
          onRefresh={this.refreshData}
          onEndReachedThreshold={0.1}
          onEndReached={this.loadData}
          ListHeaderComponent={
            <Swiper
              height={300}
              loop={true}
              autoplay={true}
              autoplayTimeout={3}
              horizontal={true}
              showsPagination={true}
              paginationStyle={{bottom:10}}
              showsButtons={false}
              >
                {this.state.latest.top_stories.map((item,index)=>{
                    return (
                      <TouchableOpacity key={item.id} onPress={()=>this.props.navigation.navigate('News',{url:item.url, id:item.id})} >
                          <ImageBackground key={item.id} source={{uri: item.image}} style={styles.ImageBackground} >
                            <View style={styles.topContainer} >
                              <Text style={styles.topTitle} numberOfLines={2} >{item.title}</Text>
                              <Text style={styles.topHint} >{item.hint}</Text>
                            </View>  
                          </ImageBackground>                    
                      </TouchableOpacity>
                    )
                  })
                }
            </Swiper>
          }
      />
        )
      }</>
    )
  }
}

const styles = StyleSheet.create({
  ImageBackground:{
    width:Dimensions.get('window').width,
    height:300,
    justifyContent:'flex-end',
    alignItems:'flex-start',
  },
  topContainer:{
    marginHorizontal:25,
    marginBottom:23,
  },
  topTitle:{
    fontSize:28,
    fontWeight:'900',
    color:'white',
  },
  topHint:{
    fontSize:15,
    color:'white',
    fontWeight:'300',
  },
  itemContainer:{
    display:'flex',
    flexDirection:'row',
    width:Dimensions.get('window').width,
    justifyContent:'space-between',
    marginVertical:10,
    alignItems:'center',
  },
  itemTextContainer:{
    flex:3,
    marginLeft:15,
    marginVertical:20,
  },
  itemImage:{
    flex:1,
    height:80,
    marginRight:20,
    marginLeft:20,
  },
  itemTitle:{
    fontSize:18,
    fontWeight:'900',
    color:'black',
  },
  itemHint:{
    fontSize:13,
  },
})