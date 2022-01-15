import React, { useState } from "react"
import { View, TextInput, StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    flex: 1,
  },
  input: {
    flex: 1,
    alignItems: "center",
    textAlignVertical: "top",
  },
})

export const NewStatusInput = ({ ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        defaultValue={props.text || ""}
        style={styles.input}
        multiline
        numberOfLines={6}
        onChangeText={(text) => {
          props.onChangeText(text)
        }}
        {...props}
      />
    </View>
  )
}
