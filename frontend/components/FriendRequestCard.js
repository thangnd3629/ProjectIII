import React from "react"
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native"

import Avatar from "../components/Avatar"
import Avatar2 from "./Avatar2"
import { LinearGradient } from "expo-linear-gradient"
import { Entypo } from '@expo/vector-icons'

export default function FriendRequestCard({
  id,
  username,
  avatar,
  onAccept,
  onDecline,
}) {
  return (
    <View style={styles.container}>
      <Avatar2 source={require("../assets/user1.jpg")} size={45} />

      <Text style={styles.nameStyle}>{username}</Text>

      <TouchableOpacity onPress={() => {
        onAccept(id)
      }}>
        <LinearGradient
          colors={["#2980b9", "#6dd5fa"]}
          start={{ x: 1.0, y: 0.0 }}
          end={{ x: 0.0, y: 0.0 }}
          style={styles.buttonStyle}
        >
          <Text style={styles.buttonTextStyle}>Đồng ý</Text>
        </LinearGradient>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => {
        onDecline(id)
      }}>
        <Entypo name="cross" size={20} color={"#757575"} style={{ marginLeft: 15 }} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    minHeight: 60,
    borderColor: "#F5F5F5",
    backgroundColor: "white",
    paddingLeft: 15,
    alignItems: "center",
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 5

  },
  nameStyle: {
    marginLeft: 20,
    fontWeight: "bold"
  },
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    height: 28,
    width: 80,
    padding: 5,
    marginLeft: 80
  },
  buttonTextStyle: {
    color: "white",
    textAlign: "center"
  }
})
