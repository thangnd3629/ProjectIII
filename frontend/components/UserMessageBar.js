import React from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native"
import Avatar2 from "./Avatar2"
import { AntDesign } from "@expo/vector-icons"

const UserMessageBar = ({
  navigation,
  id,
  userImg,
  userName,
  messageTime,
  messageText,
  fromMe,
  seen,
  read,
  partnerId,
  user,
  onPress,
}) => {
  const senderPrefix = fromMe ? "You: " : ""

  return (
    <TouchableOpacity
      onPress={() => {
        onPress(id, partnerId, userName)
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Avatar2 size={55} style={styles.avatar} source={userImg} />
        </View>
        <View style={styles.contentContainer}>
          <Text style={stylesWithState(read).nameSection}>{userName}</Text>
          <View style={styles.messageContainer}>
            <Text
              numberOfLines={1}
              style={stylesWithState(read).messageSection}
            >
              {senderPrefix + messageText}
            </Text>
            <Text>{" " + "\u2022" + " "}</Text>
            <Text>{messageTime}</Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          {fromMe ? (
            seen ? (
              <Avatar2 size={12} source={userImg} />
            ) : (
              <AntDesign name={"checkcircle"} color="grey" />
            )
          ) : (
            <></>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default UserMessageBar

const stylesWithState = (read) =>
  StyleSheet.create({
    nameSection: {
      flex: 1,
      fontWeight: read ? "normal" : "bold", //
      marginTop: 5,
    },
    messageSection: {
      fontWeight: read ? "normal" : "bold", //
      marginBottom: 5,
      maxWidth: "70%",
    },
  })

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    padding: 3,
    height: 70,
    minHeight: 60,
    maxHeight: 80,
  },
  avatar: {
    width: "3%",
  },
  imageContainer: {
    flex: 2,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 8,
    padding: 3,
    flexDirection: "column",
  },
  nameSection: {
    flex: 1,
    fontWeight: "bold", //
    marginTop: 5,
  },
  messageContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },

  statusContainer: {
    flex: 1,
    justifyContent: "center",
  },
})
