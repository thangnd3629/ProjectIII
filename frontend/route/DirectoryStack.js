import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Directory from "../screen/Directory"
import FriendRequest from "../screen/FriendRequest"
import SearchScreen from "../screen/SearchScreen"

export default function DirStack() {
  const DirStack = createNativeStackNavigator()
  return (
    <DirStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      
      <DirStack.Screen name="Directory" component={Directory} />
      <DirStack.Screen name="FriendRequest" component={FriendRequest} />
      <DirStack.Screen name="SearchNested" component={SearchScreen}/>

    </DirStack.Navigator>
  )
}
