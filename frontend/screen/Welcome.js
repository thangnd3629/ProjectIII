import React from "react"
import { Image, StyleSheet, Text, View } from "react-native"
import PrimaryButton from "../components/PrimaryButton"
import SecondaryButton from "../components/SecondaryButton"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import * as navigation from "../RouteNavigation"
export default function Welcome({}) {
  const Stack = createNativeStackNavigator()
  return (
    <View style={styles.container}>
      <Image
        style={styles.background}
        source={require("../assets/background-blue-pattern-geometric-style-blue-geometric-pattern-135451784.jpg")}
      ></Image>
      <Image
        style={styles.logo}
        source={require("../assets/pngaaa.com-5985640.png")}
      ></Image>
      <Image
        style={styles.icon}
        source={require("../assets/video-call.png")}
      ></Image>
      <View style={styles.slogan}>
        <Text style={{ fontWeight: "bold" }}>Gọi video ổn định</Text>
        <Text>Trò chuyện thật đã với chất lượng video ổn định</Text>
      </View>
      <PrimaryButton
        text="Đăng nhập"
        onPress={(e) => {
          navigation.navigate("Login")
        }}
      ></PrimaryButton>
      <SecondaryButton
        text="Đăng ký"
        onPress={(e) => {
          navigation.navigate("Signup")
        }}
      ></SecondaryButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: -1,
  },
  logo: {
    width: 90,
    height: 90,

    top: -50,
    margin: 10,
  },
  icon: {
    width: 200,
    height: 200,
    top: -50,
    margin: 30,
  },
  slogan: {
    alignItems: "center",
    margin: 30,
  },
  signinButton: {
    margin: 20,
    borderWidth: 1,
    width: 250,
    alignItems: "center",
    height: 30,
    borderRadius: 15,
  },
  loginButton: {
    margin: 20,
    borderWidth: 1,
    width: 250,
    alignItems: "center",
    height: 30,
    borderRadius: 15,
  },
})
