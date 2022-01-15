import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { useSelector } from "react-redux"
import SearchScreen from "../screen/SearchScreen"
import AuthStack from "./AuthStack"
import HeaderWithSearchBar from "../components/HeaderWithSearchBar"
import MainTabs from "./MainTabs"
import PeerProfile from "../screen/PeerProfile"
const RootStackScreen = () => {
  const RootStack = createNativeStackNavigator()
  const authInfo = useSelector((state) => state.authReducer)
  return (
    <RootStack.Navigator>
      {authInfo.user ? (
        <RootStack.Group
          screenOptions={{
            header: () => <HeaderWithSearchBar />,
          }}
        >
          <RootStack.Screen
            name="App"
            component={MainTabs}
            options={{
              animationEnabled: false,
            }}
          />
          <RootStack.Screen name="Search" component={SearchScreen}/>
          
        </RootStack.Group>
      ) : (
        <RootStack.Screen
          name="Auth"
          component={AuthStack}
          options={{
            animationEnabled: false,
          }}
        />
      )}
    </RootStack.Navigator>
  )
}

export default RootStackScreen
