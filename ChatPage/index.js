import React, { useCallback, useEffect, useState } from 'react'
import { Dimensions, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'

const ChatPage = () => {
    const [messages, setMessages] = useState([])

    useEffect(() => {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ])
    }, [])
  
    const onSend = useCallback((messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      )
    }, [])

  return (
    // <View style={{paddingHorizontal:20,flex:1,height:Dimensions.get('window').height-50}}>
    // <GiftedChat
    //   messages={messages}
    //   onSend={messages => onSend(messages)}
    //   user={{
    //     _id: 1,
    //   }}
    //   imageStyle={{backgroundColor:'red'}}
    // />
    // </View>
    <View style={{paddingHorizontal:20,flex:1,height:Dimensions.get('window').height,backgroundColor:'#fff'}}>
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{ _id: 1 }}
      placeholder="Type your message here..."
      alwaysShowSend
      renderAvatarOnTop
      showUserAvatar
      renderUsernameOnMessage
      showAvatarForEveryMessage
      
    />
    {/* {Platform.OS === 'android' && <KeyboardAvoidingView />} */}
  </View>
  )
}

export default ChatPage

const styles = StyleSheet.create({})