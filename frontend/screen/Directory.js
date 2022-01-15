import React from "react"
import { StyleSheet, Text, View, ScrollView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import * as navigation from "../RouteNavigation"
import { Ionicons } from '@expo/vector-icons'

export default function Directory() {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FriendRequest")
      }}
    >
      <View style={styles.container}>
        <Ionicons name="people-circle" size={30} color={"#3a85fc"} />
        <Text style={styles.textStyle}>Lời mời kết bạn</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 60,
    paddingLeft: 20,
    marginTop: 5
  },

  textStyle: {
    marginLeft: 10,
    fontSize: 12
  }
})
