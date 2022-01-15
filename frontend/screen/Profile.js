import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import UserFeed from "../screen/UserFeed"
import { useState } from "react"
import { ScrollView } from "react-native-gesture-handler"

import { useDispatch } from "react-redux"
export default function Profile(props) {
  const dispatch = useDispatch()
  console.log(props)
  return (
    <View style={styles.container}>
      <ScrollView>
        <UserFeed name = {props.route.params["name"]}/>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
})
