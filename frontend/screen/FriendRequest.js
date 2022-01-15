import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
import { API_URL } from "../config"
import { FlatList } from "react-native-gesture-handler"
import FriendRequestCard from "../components/FriendRequestCard"
import AltDiscoverFriendView from "../components/AltDiscoverFriendView"

export default function FriendRequest() {
  const [requests, setRequest] = useState([])
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.authReducer)
  const fetchFriendRequests = async () => {
    var myHeaders = new Headers()
    myHeaders.append("X-Auth-Token", `${auth.token}`)
    myHeaders.append("Content-Type", "application/json")
    var requestOptions = {
      headers: myHeaders,
      redirect: "follow",
    }
    try {
      const response = await fetchWithErrHandler(
        `${API_URL}/friend-request-list?size=${100}&page=${0}`,
        requestOptions,
        3000,
        dispatch
      )
      setRequest(response.body.data)
    } catch (e) { }
  }

  const onFriendRequestAction = async (isAccept, id, index) => {
    var myHeaders = new Headers()
    myHeaders.append("X-Auth-Token", `${auth.token}`)
    myHeaders.append("Content-Type", "application/json")
    var raw = JSON.stringify({
      userId: id,
      isAccept: isAccept,
    })
    console.log(raw)

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }
    try {
      const response = await fetchWithErrHandler(
        `${API_URL}/handle-friend-request`,
        requestOptions,
        3000,
        dispatch
      )
      const updatedRequest = [...requests]
      updatedRequest.splice(index, 1)
      setRequest(updatedRequest)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchFriendRequests()
  }, [])

  return (
    <View style={styles.container}>
      {requests && (
        requests.length !== 0 ?
          (<FlatList
            data={requests}
            renderItem={({ item, index }) => (
              <FriendRequestCard
                avatar={item.avatar}
                id={item.id}
                username={item.userName}
                onAccept={(id) => onFriendRequestAction(1, id, index)}
                onDecline={(id) => onFriendRequestAction(0, id, index)}
              />
            )}
          />)
          :
          <AltDiscoverFriendView/>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  buttonStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    height: 30,
    width: 80,
    padding: 5,
    marginTop: 20
  }
})
