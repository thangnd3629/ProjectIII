import React from "react"
import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import Avatar from "./Avatar"
import axios from "axios";
import { API_URL } from "../constants/ApiConstant";
import { useSelector, useDispatch } from "react-redux";
import { navigate } from "../RouteNavigation";
import { CANCEL_GLOBAL_QUERY } from "../action/types";

export default function UserContactCard(props) {
  const userName = props.userName;
  const auth = useSelector((state) => state.authReducer)
  const dispatch = useDispatch()
  const onNavigateToProfile = () => {
    console.log(auth.token)
    dispatch({
      type: CANCEL_GLOBAL_QUERY,
    })
    axios.post(API_URL + '/search-users', { keyword: props.phoneNumber }, {
      headers: {
        "X-Auth-Token": `${auth.token}`
      }
    })
      .then(res => {
        console.log(res.data)
        props.navigation.navigate("ProfileStack", {
          screen: "PeerProfile",
          params: {
            phoneNumber: res.data["data"][0]["phoneNumber"],
            name: res.data["data"][0]["userName"]
          }
        })
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onNavigateToProfile}>
      <View style={styles.avatar}>
        <Avatar source={require("../assets/user1.jpg")} />
      </View>
      <View style={styles.contact}>
        <Text style={styles.name}> {userName} </Text>
        <View style={styles.moreTools}>
          <Feather
            style={{ marginRight: 20 }}
            name="phone-call"
            size={24}
            color="black"
          />
          <Feather
            style={{ marginRight: 20 }}
            name="video"
            size={24}
            color="black"
          />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    marginTop: 5
  },
  avatar: {
    height: 40,
    width: 40,
    marginRight: 20,
  },
  contact: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  moreTools: {
    marginLeft: "auto",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  name: {
    fontWeight: "700",
  },
})
