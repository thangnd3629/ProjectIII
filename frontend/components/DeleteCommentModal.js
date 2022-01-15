import React from "react"
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native"

import MyModal from "./Modal"
export default function DeleteCommentModal({ id, ...props }) {
  const copyHandler = () => {}
  const deleteHandler = () => {}
  const options = [
    { name: "Sao chép", operation: copyHandler },
    { name: "Xóa", operation: deleteHandler },
  ]
  return (
    <MyModal {...props}>
      <View style={styles.options}>
        <FlatList
          data={options}
          keyExtractor={(item) => {
            return item.name
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={item.operation} style={styles.content}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
        ></FlatList>
      </View>
    </MyModal>
  )
}

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
  },
})
