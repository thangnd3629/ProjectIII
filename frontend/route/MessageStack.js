import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import Messages from "../screen/Messages"
import UserInbox from "../screen/UserInbox"
import UserInboxOption from "../screen/UserInboxOption"
export default function MessageStack() {
  const DirStack = createNativeStackNavigator()
  return (
    <DirStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <DirStack.Screen name="Messages" component={Messages} />
      <DirStack.Screen
        name="Inbox"
        component={UserInbox}
        options={({ route }) => ({
          headerShown: false,
          title: route.params.name,
          headerBackTitleVisible: false
        })}
      />
      <DirStack.Screen
          name="InboxOption"
          component={UserInboxOption}
          options={{ headerShown: false }}
        />
    </DirStack.Navigator>
  )
}
