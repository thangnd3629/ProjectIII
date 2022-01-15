import React from "react"
import Login from "./screen/Login"
import Welcome from "./screen/Welcome"
import Signup from "./screen/Signup"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import RootStack from "./route/RootStack"
import { navigationRef } from "./RouteNavigation"
import { store, persistor } from "./store"
import GlobalModal from "./components/GlobalModal"
import { LogBox } from "react-native"
LogBox.ignoreLogs(["Warning: ..."]) // Ignore log notification by message
LogBox.ignoreAllLogs() //Ignore all log notifications
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalModal duration={3000} />
        <NavigationContainer ref={navigationRef}>
          <RootStack></RootStack>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
