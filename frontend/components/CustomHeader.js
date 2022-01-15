import React from "react"
import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

const CustomHeader =props => {
  const navigation = useNavigation()
  return (
    <LinearGradient
      colors={["#00B4DB", "#0083B0"]}
      style={styles.container}
      start={{ x: 1.0, y: 0.0 }}
      end={{ x: 0.0, y: 0.0 }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View>
          <AntDesign
            style={{ alignSelf: "center" }}
            name="arrowleft"
            size={24}
            color="white"
          />
        </View>
      </TouchableOpacity>
      {props.label && <Text style={styles.headerName}>{props.label}</Text>}
      {props.children}
    </LinearGradient>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: 80,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  headerName: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
})
