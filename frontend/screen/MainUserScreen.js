import React, { useEffect, useState } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import Avatar2 from "../components/Avatar2"
import { StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { AUTH_LOGOUT } from "../action/types"

import axios from "axios"
import { API_URL } from "../config"

const MainUserScreen = ({ navigation }) => {
  const auth = useSelector((state) => state.authReducer)
  const user = auth.user
  const dispatch = useDispatch()
  const [name, setName] = useState()

  const getUser = () => {
    axios
      .post(
        API_URL + "/search-users",
        { keyword: user["phoneNumber"] },
        {
          headers: {
            "X-Auth-Token": `${auth.token}`,
          },
        }
      )
      .then((res) => {
        setName(res.data["data"][0]["userName"])
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <View>
      {name && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Profile", {
              name: name,
            })
          }}
        >
          <View style={styles.mainBar}>
            <Avatar2
              source={
                user.avatar ? user.avatar : require("../assets/user2.jpg")
              }
              size={70}
            />
            <View style={styles.textSection}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 17,
                }}
              >
                {name}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#757575",
                }}
              >
                Di chuyển tới trang cá nhân
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          dispatch({
            type: AUTH_LOGOUT,
          })
        }}
      >
        <View style={styles.subBar}>
          <Ionicons name="exit-outline" size={24} />
          <Text
            style={{
              marginLeft: 20,
            }}
          >
            Đăng xuất
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default MainUserScreen

const styles = StyleSheet.create({
  mainBar: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    height: 100,
    marginTop: 5,
    padding: 10,
    alignItems: "center",
  },
  textSection: {
    marginLeft: 20,
  },
  subBar: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    height: 50,
    marginTop: 5,
    padding: 10,
    alignItems: "center",
  },
})
