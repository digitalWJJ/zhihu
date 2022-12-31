import { Text, StyleSheet, View, FlatList, Button, Dimensions, ScrollView, Image } from 'react-native'
import React, { Component } from 'react'
import { getExtra,getLong,getShort } from '../../utiles/api'

export default class CommentsScreen extends Component {
  state={
    long:[],
    short:[],
    isGet:false,
    isHave:true,
  }
  componentDidMount(){
    const {setOptions} = this.props.navigation;
    const {id,extra} = this.props.route.params;
    setOptions({
      headerTitle: extra.comments+'条评论'
    })
    this.lodaData(id)
  }
  lodaData=(id)=>{
    getLong(id)
    .then((res)=>{
      let temp = res.comments
      this.setState({
        long:temp,
      })
    })
    getShort(id)
    .then((res)=>{
      let temp = res.comments
      this.setState({
        short:temp,
        isGet:true,
      })
    })
  }
  setisHave=()=>{
    if((this.state.long.length+this.state.short.length)>0){
      this.setState({
        isHave:true,
      })
    } else{
      this.setState({
        isHave:false,
      })
    }
  }
  showData=()=>{
    console.log(this.state.short)
    console.log(this.state.isGet)
  }

  render() {
    const {isHave,long,short} = this.state
    return (
      <>
        {
          !isHave
          ?
          <View style={styles.container} ><Text style={styles.noCommentsText} >暂时还没有评论,快来抢占沙发吧</Text></View>
          :
          <ScrollView>
            {!long.length? <></>:
            <View>
              <Text style={styles.title} >{long.length}条长评</Text>
              {long.map((item,index)=>{
                let opacity = index%long.length
                return (
                  <View key={item.id} >
                    <View style={styles.commentsContainer} key={item.id}>
                      <Image source={{uri: item.avatar}} />
                      <View style={styles.detailsContainer} >
                        <Text style={styles.author} >{item.author}</Text>
                        <Text style={styles.content} >{item.content}</Text>
                        <View style={styles.bottom} >
                          <Text>{item.time}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={[styles.divide,{opacity:1}]} ></View>
                  </View>
                )
              })}
            </View>
            }
            {!short.length? <></>:
            <View>
              <Text style={styles.title} >{short.length}条短评</Text>
              {short.map((item,index)=>{
                let opacity = (index+1)%short.length
                return (
                  <View key={item.id} >
                      <View style={styles.commentsContainer} key={item.id}>
                        <Image source={{uri: item.avatar}} style={styles.avatar} />
                        <View style={styles.detailsContainer} >
                          <Text style={styles.author} >{item.author}</Text>
                          <Text style={styles.content} >{item.content}</Text>
                          <View style={styles.bottom} >
                            <Text>{item.time}</Text>
                          </View>
                        </View>
                      </View>
                    <View style={styles.divide} ></View>
                  </View>
                )
              })}
            </View>
            }
            <View style={styles.container} ><Text style={styles.commentsEnd} >已显示全部评论</Text></View>
          </ScrollView>
        }
      </>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center',
  },
  noCommentsText:{
    fontSize:25,
  },
  commentsEnd:{
    fontSize:20,
    marginBottom:25,
  },
  avatar:{
    width:25,
    height:25,
  },
  title:{
    marginTop:10,
    marginBottom:20,
    marginLeft:15,
    fontSize:15,
    fontWeight:'bold',
    color:'black'
  },
  commentsContainer:{
    flexDirection:'row',
    justifyContent:'flex-start',
    flexWrap:'nowrap',
    marginHorizontal:15,
  },
  detailsContainer:{
    marginLeft:15,
    marginRight:20,
  },
  author:{
    fontSize:15,
    fontWeight:'bold',
    color:'black',
  },
  content:{
    fontSize:15,
    color:'black',
    marginBottom:15,
  },
  divide:{
    width:Dimensions.get('window').width,
    height:0,
    borderTopWidth:1,
    borderColor:'grey',
    opacity:0.3,
    marginVertical:15,
  },
})