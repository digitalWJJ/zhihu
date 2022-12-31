import { Text, StyleSheet, View, Alert } from 'react-native'
import React, { Component } from 'react'

// 返回stories数组
// export const getLatest = ()=>{
//   var result = []
//   fetch('http://news-at.zhihu.com/api/3/stories/latest',{
//     method:'GET',
//   })
//   .then( res => res.json() )
//   .then(res => {
//     // console.log(typeof(res),res)
//     // Alert.alert('成功','请求成功')
//     result = res.stories // 变量在这里不修改?
//     // console.log('result in then',result)
//   })
//   .catch((err)=>{
//     Alert.alert('报错',JSON.stringify(err))
//   })
//   return result
// }

// 获取今日日报
export const getLatest= async ()=>{
  const url = 'https://news-at.zhihu.com/api/3/stories/latest'
  try{
    const response = await(await fetch(url)).json()
    return response
  } catch(error){
    console.log('Fetch Error:',error)
  }
}

// 首页中新闻列表
export const getBefore= async (date)=>{
  const url = 'https://news-at.zhihu.com/api/3/news/before/' + date
  try{
    const response = await(await fetch(url)).json()
    return response
  } catch (error){
    console.log('Fetch Error:',error)
  }
}


// 具体新闻内容
export const getDetails= async (id)=>{
  const url = 'https://news-at.zhihu.com/api/3/story/' + id
  try{
    const response = await(await fetch(url)).json()
    return response
  } catch (error){
    console.log('Fetch Error:',error)
  }
}

// 新闻额外信息
export const getExtra= async (id)=>{
  const url = 'https://news-at.zhihu.com/api/3/story-extra/' + id
  try{
    const response = await(await fetch(url)).json()
    return response
  } catch (error){
    console.log('Fetch Error:',error)
  }
}

// 新闻对应长评论
export const getLong= async (id)=>{
  const url = 'https://news-at.zhihu.com/api/4/story/' + id + '/long-comments'
  try{
    const response = await(await fetch(url)).json()
    return response
  } catch (error){
    console.log('Fetch Error:',error)
  }
}

// 新闻对应短评论
export const getShort= async (id)=>{
  const url = 'https://news-at.zhihu.com/api/4/story/' + id + '/short-comments'
  try{
    const response = await(await fetch(url)).json()
    return response
  } catch (error){
    console.log('Fetch Error:',error)
  }
}
