import React, { useEffect, useLayoutEffect, useState } from "react"
import { StyleSheet, Text, View, useWindowDimensions } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { TabView, SceneMap } from "react-native-tab-view"
import UserContactCard from "../components/UserContactCard"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
import { API_URL } from "../config"
import { SHOW_MODAL } from "../action/types"
import SearchFriendCard from "../components/SearchFriendCard"

export default function SearchScreen({ navigation }) {
  const dispatch = useDispatch()

  const [friend, setFriend] = useState([])
  const [searchUser, setSearchUse] = useState([])
  const FriendRoute = () => (
    <View style={{ flex: 1 }}>
      {console.log(friend)}
      {friend.map((f) => {
        return (
          <UserContactCard
            navigation={navigation}
            userName={f.name}
            phoneNumber={f.phoneNumber}
          />
        )
      })}
    </View>
  )

  const SearchRoute = () => (
    <View style={{ flex: 1 }}>
      {searchUser.map((s) => {
        return <SearchFriendCard userName={s.userName} userId={s.userId} />
      })}
    </View>
  )

  const renderScene = SceneMap({
    first: SearchRoute,
    second: FriendRoute,
  })

  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "first", title: "Tìm kiếm" },
    { key: "second", title: "Bạn bè" },
  ])

  const { query } = useSelector((state) => state.globalQueryReducer)
  const auth = useSelector((state) => state.authReducer)

  const getFriend = async () => {
    console.log("get friend")
    let myHeaders = new Headers()
    myHeaders.append("X-Auth-Token", `${auth.token}`)
    myHeaders.append("Content-Type", "application/json")
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
      // redirect: "follow",
    }
    const response = await fetchWithErrHandler(
      `${API_URL}/get-friend`,
      requestOptions,
      10000,
      dispatch
    )

    setFriend(response.body)
  }

  const search = async () => {
    let myHeaders = new Headers()
    myHeaders.append("X-Auth-Token", `${auth.token}`)
    myHeaders.append("Content-Type", "application/json")
    let raw = JSON.stringify({
      keyword: query,
    })
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    }
    const response = await fetchWithErrHandler(
      `${API_URL}/search-users`,
      requestOptions,
      10000,
      dispatch
    )
    if (response.body.code === 1000) {
      setSearchUse(response.body.data)
    } else {
      dispatch({
        type: SHOW_MODAL,
        payload: {
          status: "Unknown error",
          content: response.body.message,
        },
      })
    }
  }

  useEffect(() => {
    if (query.length === 0) return

    getFriend()
    search()
  }, [query])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}

const styles = StyleSheet.create({})
