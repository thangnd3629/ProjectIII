import React, { Component } from "react"
import {
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native"

export default function Comment({
  comment,
  commenter,
  createAt,
  id,
  onDelete,
}) {
  return (
    <View style={styles.container}>
      <Image style={styles.avatar} source={{ uri: commenter.avatar }}></Image>
      <TouchableOpacity
        style={styles.centerContainer}
        onLongPress={() => onDelete(id)}
      >
        <View style={styles.contentContainer}>
          <TouchableOpacity>
            <Text style={styles.name}>{commenter.name}</Text>
          </TouchableOpacity>
          <Text style={styles.content}>{comment}</Text>
        </View>
        <View style={styles.toolContainer}>
          <Text style={styles.createAt}>{createAt}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
    marginRight: 10,
  },
  centerContainer: {
    width: "100%",
  },
  contentContainer: {
    padding: 10,
    paddingTop: 5,
    backgroundColor: "#e9ebee",
    borderRadius: 10,
  },
  name: {
    fontWeight: "bold",
  },
  content: {},
  image: {
    borderRadius: 10,
  },
  toolContainer: {
    marginTop: 5,
    flexDirection: "row",
    width: "100%",
  },
  createAt: {
    flex: 1,
    marginLeft: 10,
    color: "#808080",
  },
  likeBtn: {
    textAlign: "center",
    flex: 1,
  },
  replyBtn: {
    textAlign: "center",
    flex: 1,
  },
})
