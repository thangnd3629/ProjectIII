import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { FlatList } from "react-native-gesture-handler"
import MyModal from "./Modal"
export default function ReportModal(props) {
  const offensiveContentHandler = () => {
    console.log("offensive feed ", props.feedID)
  }
  const disturbingContentHandler = () => {}
  const scamContentHandler = () => {}
  const other = () => {}
  const options = [
    { name: "Nội dung nhạy cảm", operation: offensiveContentHandler },
    { name: "Làm phiển", operation: disturbingContentHandler },
    { name: "Lừa đảo", operation: scamContentHandler },
    { name: "Lý do khác", operation: other },
  ]

  return (
    <MyModal {...props}>
      <Text style={styles.title}>Lý do báo xấu</Text>
      <View style={styles.reportOptions}>
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
  title: {
    margin: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },

  reportOptions: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  content: {
    margin: 10,
  },
})
