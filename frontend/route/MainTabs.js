import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useState } from "react"
import HomeStack from "./HomeStack"
import MessageStack from "./MessageStack"
import DirStack from "./DirectoryStack"
import ProfileStack from "./ProfileStack"
import { AntDesign } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
const Tab = createBottomTabNavigator()
export default function MainTabs() {
  const navigation = useNavigation()
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="home" size={20} />,
        }}
      />
      <Tab.Screen
        name="MessageStack"
        component={MessageStack}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="message1" size={20} />,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="DirectoryStack"
        component={DirStack}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="appstore-o" size={20} />,
        }}
        listeners={{
          tabPress: (e) => {
            navigation.navigate("DirectoryStack", { screen: "Directory" })
            e.preventDefault()
          },
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarIcon: () => <AntDesign name="user" size={20} />,
        }}
        listeners={{
          tabPress: (e) => {
            navigation.navigate("ProfileStack", { screen: "MainUser" })
            e.preventDefault()
          },
        }}
      />
    </Tab.Navigator>
  )
}
