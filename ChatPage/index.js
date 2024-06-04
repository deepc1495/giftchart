import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, View, TouchableOpacity, Image, Video, StyleSheet, Text } from 'react-native';
import { pickSingle } from 'react-native-document-picker';
import { GiftedChat, Actions, Bubble, InputToolbar } from 'react-native-gifted-chat';
import * as ImagePicker from 'react-native-image-picker';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);

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
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderCustomActions = props => {
    const options = {
      title: 'Select Image',
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
      
    };

    const pickImage = async() => {
     try {
      await ImagePicker?.launchImageLibrary(options, response => {
        console.log('dddd',response)
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else {
          const imageMessage = {
            _id: Math.round(Math.random() * 1000000),
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'You',
            },
            image: response?.assets[0]?.uri,
            type:'img',
            name:response?.assets[0]?.fileName


          };
          console.log('tess',imageMessage)
          onSend([imageMessage]);
        }
      });
     } catch (error) {
      console.log('errr',error)
     }
    };

    const pickCamera = async() => {
      try {
       await ImagePicker?.launchCamera(options, response => {
         console.log('dddd',response)
         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else {
           const imageMessage = {
             _id: Math.round(Math.random() * 1000000),
             createdAt: new Date(),
             user: {
               _id: 1,
               name: 'You',
             },
             image: response?.assets[0]?.uri,
             type:'img',
             name:response?.assets[0]?.fileName
 
 
           };
           console.log('tess',imageMessage)
           onSend([imageMessage]);
         }
       });
      } catch (error) {
       console.log('errr',error)
      }
     };

    const pickVideo = async() => {
      try {
       await ImagePicker?.launchImageLibrary({mediaType:'video'}, response => {
         console.log('dddd',response)
         if (response.didCancel) {
           console.log('User cancelled image picker');
         } else if (response.error) {
           console.log('ImagePicker Error: ', response.error);
         } else {
           const imageMessage = {
             _id: Math.round(Math.random() * 1000000),
             createdAt: new Date(),
             user: {
               _id: 1,
               name: 'You',
             },
             image: response?.assets[0]?.uri,
           };
           console.log('tess',imageMessage)
           onSend([imageMessage]);
         }
       });
      } catch (error) {
       console.log('errr',error)
      }
     };

    const PickDoc = async() => {
      try {
        const result = await pickSingle({mode:'import'})
        if(result?.name){
          const imageMessage = {
            _id: Math.round(Math.random() * 1000000),
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'You',
            },
            image: result?.uri,
            type:'doc',
            name:result?.name
          };
          console.log('tess',imageMessage)
          onSend([imageMessage]);
        }
        
      } catch (error) {
       console.log('errr',error)
      }
     };

    return (
      <Actions
        {...props}
        options={{
          'Send Image': pickImage,
          'Camera': pickCamera,
          'Send Video': pickVideo,
          'Send Document': PickDoc,
          // Cancel: () => {},
        }}
        optionTintColor="#222B45"
      />
    );
  };

  const renderMessageImage = (props) => {
    const { currentMessage } = props;
    console.log('currentMessage',currentMessage)
    return (
      <View style={{ padding: 5 }}>
        {currentMessage?.type ==='doc'?
        <View style={{paddingHorizontal:5}}>
          <Text style={{color:'#fff'}}>{currentMessage?.name}</Text>
        </View>
       : <Image
          source={{ uri: currentMessage.image }}
          style={{ width: 200, height: 200, borderRadius: 13 }}
        />
        }
      </View>
    );
  };

  const renderMessageVideo = (props) => {
    const { currentMessage } = props;
    return (
      <View style={{ padding: 5 }}>
        <Video
          source={{ uri: currentMessage.video }}
          style={{ width: 200, height: 200, borderRadius: 13 }}
          controls={true}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff',height:Dimensions.get('screen').height-60 }}>
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
        renderActions={renderCustomActions}
        renderMessageImage={renderMessageImage}
        renderMessageVideo={renderMessageVideo}
        renderme
        renderInputToolbar={(props) => <CustomBubble {...props} />}
      />
    </View>
  );
};

export default ChatPage;


const CustomBubble = (props) => {
  return (
    <InputToolbar {...props} containerStyle={{borderTopWidth: 0,backgroundColor:'#F8F8FF',borderRadius:30,marginHorizontal:10}} />
  );
};




