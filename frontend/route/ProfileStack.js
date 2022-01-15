import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import MainUserScreen from "../screen/MainUserScreen"
import Profile from "../screen/Profile"
import PeerProfile from "../screen/PeerProfile"
export default function ProfileStack() {
  const ProfileStack = createNativeStackNavigator()
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      
      <ProfileStack.Screen name="MainUser" component={MainUserScreen}/>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="PeerProfile" component = {PeerProfile}/>
      
    </ProfileStack.Navigator>
  )
}
