import React, { useState, useEffect, useCallback } from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  LogBox,
  Button,
  TouchableOpacity,
} from "react-native"
import UserMessageBar from "../components/UserMessageBar"
import { Divider } from "react-native-paper"
import Avatar2 from "../components/Avatar2"
import { AntDesign } from "@expo/vector-icons"
import CustomHeader from "../components/CustomHeader"
import { API_URL } from "../config"

import { useSelector, useDispatch } from "react-redux"

import SockJS from "sockjs-client" // Note this line
import Stomp from "stompjs"
import useFetch from "../hook/useFetch"
import { ADD_MESSAGE, EXIT_CHAT } from "../action/types"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
import AltDiscoverFriendView from "../components/AltDiscoverFriendView"

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
])

export function generateUUID(digits) {
  let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ"
  let uuid = []
  for (let i = 0; i < digits; i++) {
    uuid.push(str[Math.floor(Math.random() * str.length)])
  }
  return uuid.join("")
}
const getOffsetTime = (date) => {
  let msgDate = new Date(date)
  let offSet =
    Math.floor(new Date().getTime() / 1000) -
    Math.floor(msgDate.getTime() / 1000)
  let hrs = Math.floor(offSet / 3600)
  let mins = Math.floor((offSet - hrs * 3600) / 60)
  let secs = Math.floor(offSet - hrs * 3600 - mins * 60)
  let re = ""
  if (hrs !== 0 && hrs <= 24) {
    re = `${hrs} hrs`
  } else if (mins !== 0) {
    re = `${mins} mins`
  } else {
    re = `${secs} secs`
  }
  return re
}

export default function Messages({ navigation }) {
  const authToken = useSelector((state) => state.authReducer.token)
  const userId = useSelector((state) => state.authReducer.user.id)
  const auth = useSelector((state) => state.authReducer)
  const currentConversation = useSelector((state) => state.messageReducer)

  const send = useFetch()
  const dispatch = useDispatch()
  const inboxFetchSize = 5
  const [page, setPage] = useState(0)
  const [inbox, setInbox] = useState([])
  const [newestMessage, setNewestMessage] = useState(null)
  const [connection, setConnection] = useState(null)
  const [friend, setFriend] = useState()
  var stompClient = null

  const getFriend = async () => {
    console.log("get friend")
    let myHeaders = new Headers()
    myHeaders.append("X-Auth-Token", `${auth.token}`)
    myHeaders.append("Content-Type", "application/json")
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      // redirect: "follow",
    }
    const response = await fetchWithErrHandler(
      `${API_URL}/get-friend`,
      requestOptions,
      10000,
      dispatch
    )
    let tmpFriends = response.body.map((item, idx) => ({
      ...item,
      id: "" + (idx + 1),
      userImg: require("../assets/user1.jpg"),
    }))
    let addContact = [
      {
        id: "0",
        name: "",
        userImg: "",
      },
    ]
    tmpFriends = addContact.concat(tmpFriends)

    console.log("response {}", response.body)

    setFriend(
      tmpFriends.filter((item) => item.phoneNumber !== auth.user.phoneNumber)
    )
  }

  useEffect(() => {
    getFriend()
    dispatch({ type: EXIT_CHAT })
  }, [])

  useEffect(() => {
    if (newestMessage === null) return
    console.log("RUN EFFECT ------------")
    console.log(newestMessage)
    const conversationId = newestMessage.conversationId

    const newMessages = convertMsgToGiftedChatFormat([newestMessage])

    //update inner chat , if active
    if (conversationId === currentConversation.conversationId) {
      dispatch({
        type: ADD_MESSAGE,
        payload: {
          messages: [newMessages[0]],
        },
      })
    }
    //update lastest messages
    const updatedInbox = [...inbox]

    inbox.forEach((ib, index) => {
      if (ib.id === conversationId) {
        updatedInbox[index].lastMessage = {
          message: newestMessage.message,
          created: newestMessage.created,
          unread: 1,
        }
        return
      }
    })

    setInbox(updatedInbox)
  }, [newestMessage])

  //connect to socket
  const onMessageReceived = (msg) => {
    setNewestMessage(JSON.parse(msg.body))
  }

  const onConnected = () => {
    stompClient.subscribe(`/topic/user/${userId}`, onMessageReceived)
  }

  const onError = (err) => {
    console.log(err)
  }

  const connect = () => {
    let sockJS = new SockJS(`${API_URL}/messenger`)
    stompClient = Stomp.over(sockJS)
    stompClient.connect(
      { "X-Auth-Token": `${authToken}` },
      onConnected,
      onError
    )
    setConnection(stompClient)
  }

  useEffect(() => {
    connect()
    return () => {
      // useEffect scoped this stompClient var
      stompClient.disconnect()
    }
  }, [])
  //socket connected

  //fetch  inboxes
  const fetchInbox = async () => {
    try {
      const response = await send(
        `${API_URL}/conversation?size${inboxFetchSize}&page=${page}`,
        { method: "GET" },
        10000,
        true
      )
      console.log(response.body.data)
      setInbox((prev) => {
        return [...prev, ...response.body.data]
      })
    } catch (e) {}
  }

  useEffect(() => {
    fetchInbox()
  }, [])

  //utils
  const convertMsgToGiftedChatFormat = (msgList) => {
    if (msgList.length === 0) return []
    const processedMsgs = msgList.map((message, idx) => ({
      _id: generateUUID(32),
      text: message.message,
      createdAt: message.created,
      user: {
        _id: message.sender.id,
        name: message.sender.name,
        avatar: message.sender.avartar,
      },
    }))
    return processedMsgs
  }

  //send socket messages
  const onSendMessage = (messages, partnerId, cid) => {
    const raw = JSON.stringify({
      toUser: partnerId,
      fromUser: userId,
      content: messages[0].text,
    })
    connection.send("/app/message", {}, raw)

    setNewestMessage({
      conversationId: cid,
      created: Date.now(),
      message: messages[0].text,
      message_id: "",
      sender: {
        avartar: null,
        id: userId,
        name: "",
      },
      unread: 1,
    })
  }

  const onEnterChat = (id, partnerId, userName) => {
    navigation.setOptions({ tabBarStyle: { display: "none" } })
    navigation.navigate("Inbox", {
      name: userName,
      onSendMessage: onSendMessage,
      id: id,
      partnerId: partnerId,
    })
  }

  const friends = [
    {
      id: "15",
      name: "this user name",
      userImg: require("../assets/user1.jpg"),
    },
  ]

  const inboxList =
    inbox.length !== 0 ? (
      <FlatList
        style={{ backgroundColor: "white" }}
        data={inbox}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <UserMessageBar
              onPress={onEnterChat}
              id={item.id}
              navigation={navigation}
              userName={item.partner.username}
              userImg={require("../assets/user1.jpg")}
              partnerId={item.partner.id}
              messageTime={getOffsetTime(item.lastMessage.created)}
              messageText={item.lastMessage.message}
              fromMe={item.lastMessage.senderId === userId}
              seen={
                item.lastMessage.senderId === userId &&
                item.lastMessage.unread == 0
              }
              read={
                item.lastMessage.senderId !== userId &&
                item.lastMessage.unread == 0
              }
              user={item} // you can remove these props above and only use this
            />
          )
        }}
      />
    ) : (
      <AltDiscoverFriendView />
    )

  return (
    <View style={styles.container}>
      <CustomHeader label={"Messages"} navigation={navigation} />
      <View style={styles.friendListContainer}>
        <FlatList /* horizontal flat list showing friend list*/
          data={friend}
          style={styles.scrollContent}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return item.id !== "0" ? (
              <View style={styles.friendContainer}>
                <Avatar2
                  size={55}
                  source={
                    item.userImg
                  } /* touch opacity to navigate to User Profile*/
                />

                <Text
                  numberOfLines={2}
                  style={{
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("DirectoryStack", {
                    screen: "SearchNested",
                  })
                }
              >
                <View style={styles.friendContainer}>
                  <AntDesign
                    name="pluscircle"
                    size={55}
                    color="darkgrey" /* touch opacity to navigate to User Profile*/
                  />

                  <Text
                    numberOfLines={2}
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    Add {"\n"} contact
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
      <Divider />
      {inboxList}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    height: "100%",
  },
  friendListContainer: {
    width: "100%",
    height: 120,
    paddingTop: 13,
  },
  inboxListContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
  },
  friendContainer: {
    display: "flex",
    width: 100,
    paddingLeft: 13,
    flexDirection: "column",
    alignItems: "center",
  },
})
