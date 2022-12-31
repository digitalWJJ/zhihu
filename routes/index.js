//import * as React from 'react';
import { Button, Dimensions, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';

import HomeScreen from '../screens/home/index'
import NewsScreen from '../screens/news/index'
import UserScreen from '../screens/user/index'
import CommentsScreen from '../screens/comments/index'


const Stack = createNativeStackNavigator();
var date = new Date();
export default class MainStack extends Component {
    state ={
        helloText:'',
        commentsTitle:'',
        day: date.getDate(),
        mounth: '',
    }
    componentDidMount() {
        this.setHelloText()
        this.setDate()
     }
    setHelloText=()=>{
        switch(date.getHours()){
            case 23:case 24:case 1:
                this.setState({
                    helloText:'早点休息'
                })
                break;
            case 5:case 6:case 7:case 8:
                this.setState({
                    helloText:'上午好'
                })
                break;
            case 17: case 18:
                this.setState({
                    helloText:'下午好'
                })
                break;
            default:
                this.setState({
                    helloText:'知乎日报'
                })
        }
    }
    setDate=()=>{
        var tempMounth = ''
        switch(date.getMonth()){
            case 0:tempMounth = '一月';break;
            case 1:tempMounth = '二月';break;
            case 2:tempMounth = '三月';break;
            case 3:tempMounth = '四月';break;
            case 4:tempMounth = '五月';break;
            case 5:tempMounth = '六月';break;
            case 6:tempMounth = '七月';break;
            case 7:tempMounth = '八月';break;
            case 8:tempMounth = '九月';break;
            case 9:tempMounth = '十月';break;
            case 10:tempMounth = '十一月';break;
            case 11:tempMounth = '十二月';break;
        }
        this.setState({
            mounth: tempMounth,
        })
    }
    
  render() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
        >
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle:this.state.helloText,
                    headerStyle:{
                        backgroundColor:'white',
                    },
                    headerTintColor:'black',
                    headerRight:()=>{
                        return (
                            <TouchableOpacity onPress={()=> alert('此功能待开发')}>
                                <Text>right</Text>
                            </TouchableOpacity>
                        )
                    },
                    headerLeft:()=>{
                        return (
                            <View style={styles.headerLeftContainer} >                                
                                <View style={styles.headerLeft} >
                                    <Text style={{color:'black', fontWeight:'bold', fontSize:20 }} >{this.state.day}</Text>
                                    <Text style={{color:'black', fontWeight:'bold', fontSize:10 }} >{this.state.mounth}</Text>
                                </View>
                                <View style={styles.divide} ></View>
                            </View>
                        )
                    }
                }}
            />
            <Stack.Screen 
                name="News" 
                component={NewsScreen}
                options={{
                    headerShown:false,
                    headerTitle:'null',
                }}
            />
            <Stack.Screen name="User" component={UserScreen} />
            <Stack.Screen name="Comments" component={CommentsScreen} 
                options={{
                    headerTitle:'暂无评论',
                    headerStyle:{
                        flex:1,
                        textAlign:'center',
                    },
                }}
            />
        </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({
    headerLeftContainer:{
        flexDirection:'row',
    },
    headerLeft:{
        alignItems:'center',
        justifyContent:'center',
    },
    divide:{
        marginHorizontal:10,
        width:0,
        height:40,
        borderWidth:1,
        borderColor:'grey',
        opacity:0.3,
    },
})