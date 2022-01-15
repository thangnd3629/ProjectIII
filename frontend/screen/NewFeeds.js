import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, FlatList } from "react-native"
import Feed from "../components/Feed"
import PostToolsGroup from "../components/PostToolsGroup"
import ReportModal from "../components/ReportModal"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
import { API_URL } from "../config"
import { useSelector, useDispatch } from "react-redux"
import useFetch from "../hook/useFetch"
export default function NewFeeds({}) {
  const fetchSize = 2
  const [reportFeedModalShow, setReportFeedModal] = useState(false)
  const [reportedFeedID, setReportFeedID] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [page, setPage] = useState(0)
  const [numNewPostsFetched, setNewNumPostFetch] = useState(null)
  const [feeds, setFeeds] = useState([])
  const auth = useSelector((state) => state.authReducer)
  const reportFeedHandler = (feedId) => {
    setReportFeedModal(true)
    setReportFeedID(feedId)
  }
  const closeReportModal = () => {
    setReportFeedModal(false)
  }

  const dispatch = useDispatch()

  const send = useFetch()
  const fetchNewPosts = async () => {
    try {
      var myHeaders = new Headers()
      myHeaders.append("X-Auth-Token", `${auth.token}`)
      myHeaders.append("Content-Type", "application/json")

      var requestOptions = {
        headers: myHeaders,
        redirect: "follow",
      }

      const response = await fetchWithErrHandler(
        `${API_URL}/post?size=${fetchSize}&page=${page}`,
        requestOptions,
        10000,
        dispatch
      )

      const newPost = response.body.data
      setNewNumPostFetch(newPost.length)

      setFeeds((prevState) => [...prevState, ...newPost])
    } catch (e) {}
  }

  useEffect(() => {
    fetchNewPosts()
  }, [page])

  const onLoadMore = () => {
    if (numNewPostsFetched === fetchSize) {
      setPage((prevState) => prevState + 1)
      return
    }
  }

  const onLikePost = async (id) => {
    try {
      await send(
        `${API_URL}/post/like/${id}`,
        {
          method: "POST",
        },
        3000,
        dispatch,
        true
      )
    } catch (e) {
      console.log(e)
    }
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    setFeeds([])
    await fetchNewPosts()
    setRefreshing(false)
  }, [])

  return (
    <View style={styles.container}>
      <ReportModal
        visible={reportFeedModalShow}
        feedID={reportedFeedID}
        onClose={closeReportModal}
      />

      <PostToolsGroup />
      <View style={styles.feedGroup}>
        {feeds.length > 0 && (
          <FlatList
            data={feeds}
            keyExtractor={(item) => item.id}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onEndReachedThreshold={0.6}
            onEndReached={onLoadMore}
            renderItem={({ item, index }) => {
              return (
                <Feed
                  described={item.describe}
                  author={item.author}
                  can_edit={true}
                  like={item.like}
                  is_liked={item.isLike}
                  comment={item.numComment}
                  image={item.image}
                  id={item.id}
                  created={item.createAt}
                  onReport={reportFeedHandler}
                  onLike={onLikePost}
                />
              )
            }}
          />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedGroup: {
    flex: 1,
  },
})
