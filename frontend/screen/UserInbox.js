import React, { useState, useCallback, useEffect } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { GiftedChat, Composer } from "react-native-gifted-chat"
import CustomHeader from "../components/CustomHeader"
import { Ionicons, Feather } from "@expo/vector-icons"
import { navigate } from "../RouteNavigation"
import { FontAwesome } from "@expo/vector-icons"

import Emoji from "../utils/Emoji"
import { toArray } from "react-emoji-render"
import useFetch from "../hook/useFetch"
import { API_URL } from "../config"
import { useSelector, useDispatch } from "react-redux"
import {
  ADD_MESSAGE,
  EXIT_CHAT,
  FETCH_OLD_MESSAGES,
  INIT_CONVERSATION,
} from "../action/types"
const emoji = new Emoji()

const UserInbox = (props) => {
  const [text, setText] = useState("")

  const { id, partnerId, onSendMessage } = props.route.params
  const userId = useSelector((state) => state.authReducer.user.id)
  const dispatch = useDispatch()
  const { conversationId, messages, page, partner } = useSelector((state) => {
    return state.messageReducer
  })
  console.log("TAGGG", conversationId)

  const send = useFetch()

  const initConversation = async () => {
    const lastestMessages = await fetchMessages()

    if (lastestMessages) {
      dispatch({
        type: INIT_CONVERSATION,
        payload: {
          conversationId: id,
          messages: lastestMessages.messages,
        },
      })
    }
  }
  const loadMoreMessages = async () => {
    const oldMessages = await fetchMessages()
    if (oldMessages) {
      dispatch({
        type: ADD_MESSAGE,
        payload: {
          messages: oldMessages,
        },
      })
    }
  }
  const onLoadMore = () => {
    dispatch({
      type: FETCH_OLD_MESSAGES,
    })
  }

  const convertMsgToGiftedChatFormat = (msgList) => {
    if (msgList.length === 0) return []
    const processedMsgs = msgList.map((message, idx) => ({
      _id: message.message_id,
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

  const fetchMessages = async () => {
    try {
      const response = await send(
        `${API_URL}/conversation/${id}?size=5&page=${page}`,
        { method: "GET" },
        10000,
        true
      )

      return {
        messages: convertMsgToGiftedChatFormat(response.body.messageList),
        partner: response.body.partner,
      }
    } catch (e) {
      return null
    }
  }
  useEffect(() => {
    initConversation()
  }, [])

  // useEffect(() => {
  //   loadMoreMessages()
  // }, [page])

  useEffect(() => {
    return () => {
      dispatch({ type: EXIT_CHAT })
    }
  }, [])
  const onChangeTextHandle = (string) => {
    let rawString = emoji.reverseParse(string)
    setText(rawString)
  }

  const renderInput = (props) => {
    const { text, messageIdGenerator, user, onSend } = props
    return (
      <View
        {...props}
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity>
          <FontAwesome
            style={{ paddingLeft: 5 }}
            name="picture-o"
            size={24}
            color="#ddddd1"
          />
        </TouchableOpacity>

        <Composer {...props} />

        <TouchableOpacity
          onPress={() => {
            if (text && onSend) {
              onSend(
                { text: text.trim(), user: user, _id: messageIdGenerator() },
                true
              )
            }
          }}
        >
          <Ionicons
            style={{ paddingLeft: 10, paddingRight: 5 }}
            name="send"
            size={24}
            color="blue"
          />
        </TouchableOpacity>
      </View>
    )
  }

  const onSend = useCallback(
    (messages = []) => {
      onSendMessage(messages, partnerId, conversationId)
    },
    [conversationId]
  )

  const onPressOption = () => {
    navigate("InboxOption", {
      name: props.route.params.name,
      nav: props.route.params.nav,
    })
  }

  return (
    <View style={styles.container}>
      <CustomHeader
        label={props.route.params.name}
        navigation={props.route.params.nav}
      >
        <View style={styles.headerOptionsContainer}>
          <View style={styles.headerOptions}>
            <TouchableOpacity>
              <Ionicons
                style={{ paddingLeft: 25 }}
                name="call-outline"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather
                style={{ paddingLeft: 25 }}
                name="video"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressOption}>
              <Ionicons
                style={{ paddingLeft: 25 }}
                name="options"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </View>
      </CustomHeader>

      <GiftedChat
        listViewProps={styles.inboxContainer}
        textInputProps={styles.composer}
        maxComposerHeight={200}
        minInputToolbarHeight={60}
        renderInputToolbar={renderInput}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        alwaysShowSend
        user={{
          _id: userId,
        }}
        text={emoji.parse(text)}
        onInputTextChanged={onChangeTextHandle}
        parsePatterns={(linkStyle) => [
          { type: "phone", style: linkStyle, onPress: this.onPressPhoneNumber },
        ]}
      />
    </View>
  )
}

export default UserInbox

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 60,
    width: "100%",
  },
  headerName: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  inboxContainer: {
    backgroundColor: "white",
  },
  headerOptionsContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerOptions: {
    display: "flex",
    flexDirection: "row",
  },
  inputBar: {
    borderRadius: 10,
    backgroundColor: "red",
    marginLeft: 20,
  },
  footerToolbar: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
  },

  composer: {
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: "#dddddd",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    fontSize: 16,
    backgroundColor: "#dddddd",
  },
  phone: {},
})
