import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"

import Login from "../screen/Login"
import Signup from "../screen/Signup"
import Welcome from "../screen/Welcome"

export default function AuthStack() {
  const AuthStack = createNativeStackNavigator()
  return (
    <AuthStack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Welcome" component={Welcome} />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Signup" component={Signup} />
    </AuthStack.Navigator>
  )
}
