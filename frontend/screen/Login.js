import React from "react"
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native"
import base64 from "base-64"
import { AntDesign } from "@expo/vector-icons"
import { useForm, Controller } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { AUTH_SUCCESS, SHOW_MODAL } from "../action/types"
import { API_URL } from "../config"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
import * as navigation from "../RouteNavigation"
export default function Login({}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const dispatch = useDispatch()
  const onSubmit = async (data) => {
    const { phoneNumber, password } = data
    const headers = new Headers()
    headers.set(
      "Authorization",
      "Basic " + base64.encode(phoneNumber + ":" + password)
    )

    const requestOptions = {
      headers: headers,
    }
    try {
      const response = await fetchWithErrHandler(
        `${API_URL}/login`,
        requestOptions,
        3000,
        dispatch
      )

      if (response.metadata.status === 200) {
        dispatch({
          type: AUTH_SUCCESS,
          payload: {
            user: response.body,
            token: response.metadata.headers.get("X-Auth-Token"),
          },
        })
        return
      }
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Credential Error",
          content: "Wrong username or password",
        },
      })

      return
    } catch (e) {}
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require("../assets/background-blue-pattern-geometric-style-blue-geometric-pattern-135451784.jpg")}
      ></Image>
      <View style={styles.logo}>
        <Image
          source={require("../assets/zalo-1-logo-png-transparent.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>
      <Text style={styles.welcome}>
        {"Đăng nhập tài khoản Zalo \n để kết nối với ứng dụng Zalo Chat"}
      </Text>

      <View style={styles.form}>
        <View style={styles.groupInput}>
          <AntDesign name="phone" size={24} color="black" />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={"Phone number"}
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phoneNumber"
            defaultValue=""
          />
          {errors.firstName && <Text>This is required.</Text>}
        </View>

        <View style={styles.groupInput}>
          <AntDesign name="lock" size={24} color="black" />
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder={"Password"}
                style={styles.input}
                secureTextEntry={true}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
            defaultValue=""
          />
        </View>
        <TouchableOpacity style={styles.submit}>
          <Button
            title="Đăng nhập với mật khẩu"
            onPress={handleSubmit(onSubmit)}
          />
        </TouchableOpacity>
        <View style={styles.more}>
          <TouchableOpacity>
            <Pressable
              style={styles.clearButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text
                style={{ color: "lightblue", padding: 10, textAlign: "center" }}
              >
                Gửi yêu cầu đăng nhập
              </Text>
            </Pressable>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity>
        <Text
          onPress={() => {
            navigation.navigate("Signup")
          }}
        >
          Chưa có tài khoản? Đăng ký ngay
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  form: {
    backgroundColor: "white",
    width: "80%",
    padding: 20,
    margin: 20,
    borderRadius: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
    alignItems: "center",
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
    width: "80%",
    borderRadius: 100,
    borderColor: "green",
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
