import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import AddPost from "../screen/AddPost"
import Comment from "../screen/Comment"
import EditPost from "../screen/EditPost"
import NewFeeds from "../screen/NewFeeds"
export default function HomeStack() {
  const HomeStack = createNativeStackNavigator()
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{ headerShown: false }}
        name="NewFeed"
        component={NewFeeds}
      />
      <HomeStack.Screen name="AddPost" component={AddPost} />
      <HomeStack.Screen name="EditPost" component={EditPost} />
      <HomeStack.Screen name="Comment" component={Comment} />
    </HomeStack.Navigator>
  )
}
