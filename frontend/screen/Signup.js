import React, { useState, useEffect } from "react"
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Button,
} from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { API_URL } from "../config"
import { Entypo } from "@expo/vector-icons"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { SHOW_MODAL } from "../action/types"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
import * as navigation from "../RouteNavigation"
export default function Signup({}) {
  const [selectedRegion, setRegion] = useState("VN")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const onSubmit = async () => {
    var myHeaders = new Headers()
    myHeaders.append("Content-Type", "application/json")

    if (phoneNumber.length > 15 || phoneNumber < 7) {
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Unknown error",
          content: "phone number length from 7 to 15",
        },
      })
      return
    }

    let a = Number(phoneNumber)
    console.log("a", a)
    if (isNaN(a)) {
      console.log("xxxxxxxxxx")
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Unknown error",
          content: "phone number require from 0 to 9",
        },
      })
      return
    }

    if (password.length < 6) {
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Unknown error",
          content: "password length require >= 6",
        },
      })
      return
    }

    if (name.length > 100 || name.length < 5) {
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Unknown error",
          content: "name length from 5 to 100",
        },
      })
      return
    }
    var raw = JSON.stringify({
      phoneNumber: phoneNumber,
      password: password,
      name: name,
    })

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    }
    try {
      const response = await fetchWithErrHandler(
        `${API_URL}/user/register`,
        requestOptions,
        10000,
        dispatch
      )
      console.log("response ", response)
      if (response.body.code === 1000) {
        navigation.navigate("Login")
      } else {
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require("../assets/background-blue-pattern-geometric-style-blue-geometric-pattern-135451784.jpg")}
      ></Image>

      <View style={styles.groupInput}>
        <AntDesign name="phone" size={24} color="black" />
        <TextInput
          placeholder={"Phone number"}
          onChangeText={(input) => {
            setPhoneNumber(input)
          }}
          value={phoneNumber}
          style={styles.input}
        />
        <View>
          <Entypo
            name="cross"
            size={24}
            color="black"
            onPress={() => {
              setPhoneNumber("")
            }}
          />
        </View>
      </View>
      <View style={styles.groupInput}>
        <AntDesign name="phone" size={24} color="black" />
        <TextInput
          placeholder={"Name"}
          onChangeText={(input) => {
            setName(input)
          }}
          value={name}
          style={styles.input}
        />
        <View>
          <Entypo
            name="cross"
            size={24}
            color="black"
            onPress={() => {
              setName(name)
            }}
          />
        </View>
      </View>
      <View style={styles.groupInput}>
        <AntDesign name="phone" size={24} color="black" />
        <TextInput
          placeholder={"Password"}
          onChangeText={(input) => {
            setPassword(input)
          }}
          value={password}
          style={styles.input}
        />
        <View>
          <Entypo
            name="cross"
            size={24}
            color="black"
            onPress={() => {
              setPhoneNumber("")
            }}
          />
        </View>
      </View>
      {/*<TouchableOpacity style={styles.submit} onPress={onSubmit}>*/}
      {/*  <View>*/}
      {/*    <View style={styles.circle}>*/}
      {/*      <AntDesign*/}
      {/*        style={styles.arrow}*/}
      {/*        name="arrowright"*/}
      {/*        size={24}*/}
      {/*        color="black"*/}
      {/*      />*/}
      {/*    </View>*/}
      {/*  </View>*/}
      {/*</TouchableOpacity>*/}
      <TouchableOpacity style={styles.submit}>
        <Button title="Đăng ký" onPress={onSubmit} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  arrow: {
    color: "white",
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: "#0099ff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  input: {
    color: "black",
    margin: 15,
    padding: 10,
    borderWidth: 0,
    borderLeftWidth: 1,
    flex: 1,
  },
  groupInput: {
    marginTop: 20,

    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    marginBottom: 10,
    width: "80%",
  },

  logo: {
    padding: 30,
  },
  submit: {
    position: "absolute",
    bottom: 50,
    right: 50,
  },
  welcome: {
    fontWeight: "700",
    textAlign: "center",
  },
  more: {
    margin: 10,
    width: "80%",
    textAlign: "center",
    alignItems: "center",
  },
  clearButton: {
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 3,
    marginBottom: 20,
    minWidth: "100%",
  },
})
