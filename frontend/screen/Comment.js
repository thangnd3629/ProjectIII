import React, { useEffect, useState } from "react"
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
  Button,
} from "react-native"
import Comment from "../components/Comment"
import DeleteCommentModal from "../components/DeleteCommentModal"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5"
import { AntDesign } from "@expo/vector-icons"
import useFetch from "../hook/useFetch"
import { API_URL } from "../config"
import { useRoute } from "@react-navigation/native"
import { useSelector } from "react-redux"

export default function CommentScreen() {
  const [inputComment, setInputComment] = useState("")
  const send = useFetch()
  const fetchSize = 10
  const [numFetchedNewComment, setFetchedNewComment] = useState(null)
  const [page, setpage] = useState(0)
  const user = useSelector((state) => state.authReducer.user)
  const route = useRoute()
  const { postId } = route.params
  const fetchComment = async () => {
    try {
      const response = await send(
        `${API_URL}/post/${postId}/comment?size=${fetchSize}&page=${page}`,
        {},
        10000,
        true
      )
      setComments((prevState) => [...prevState, ...response.body.data])
      setFetchedNewComment(response.body.data.length)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    console.log("Run effect")

    fetchComment()
  }, [page])

  const fetchMore = () => {
    if (numFetchedNewComment === fetchSize) {
      setpage((prev) => prev + 1)
    }
  }

  const [comments, setComments] = useState([])
  const [commentPopUpMenuID, setCommentPopUpMenu] = useState(null)
  const deleteCommentHandler = (id) => {
    setCommentPopUpMenu(id)
  }
  const onChangeComment = async (text) => {
    setInputComment(text)
  }

  const onSubmitComment = async () => {
    var raw = JSON.stringify({
      comment: inputComment,
    })
    try {
      const response = await send(
        `${API_URL}/post/${postId}/comment`,
        {
          method: "POST",
          body: raw,
        },
        10000,
        true
      )
      setComments((prev) => {
        const submmitedComment = {
          id: response.body.id,
          commenter: {
            avatar: user.avatar,
            name: user.userName,
          },
          createAt: "Vua xong",
          comment: inputComment,
        }
        return [...prev, submmitedComment]
      })
      setInputComment("")
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <View style={styles.wrapper}>
      {commentPopUpMenuID && (
        <DeleteCommentModal
          id={commentPopUpMenuID}
          onClose={() => {
            setCommentPopUpMenu(null)
          }}
        />
      )}

      <View style={styles.commentSection}>
        <FlatList
          data={comments}
          keyExtractor={(item) => `${item.id}`}
          onEndReachedThreshold={0.5}
          onEndReached={fetchMore}
          renderItem={({ item }) => {
            return (
              <Comment
                comment={item.comment}
                id={item.id}
                commenter={item.commenter}
                createAt={item.createAt}
                onDelete={deleteCommentHandler}
              />
            )
          }}
        />
      </View>
      <View style={styles.commentInputWrapper}>
        <TouchableOpacity style={styles.cameraIconWrapper}>
          <FontAwesome5Icon name="camera" size={20}></FontAwesome5Icon>
        </TouchableOpacity>
        <View style={styles.textInputWrapper}>
          <TextInput
            value={inputComment}
            autoFocus={true}
            style={styles.textInput}
            onChangeText={onChangeComment}
          ></TextInput>
        </View>
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.iconItem}>
            <FontAwesome5Icon
              name="grip-horizontal"
              size={20}
            ></FontAwesome5Icon>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconItem}>
            <FontAwesome5Icon name="grin-wink" size={20}></FontAwesome5Icon>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.iconItem}>
          <TouchableOpacity
            disabled={!inputComment.length}
            onPress={onSubmitComment}
          >
            <AntDesign
              name="caretright"
              size={24}
              color={inputComment.length ? "blue" : "black"}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const screenWidth = Math.round(Dimensions.get("window").width)
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  commentSection: {
    flex: 1,
    padding: 10,
  },
  commentInputWrapper: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "#ddd",
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingHorizontal: 15,
    height: 50,
    backgroundColor: "#fff",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  iconItem: {
    width: 30,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconWrapper: {
    backgroundColor: "#ddd",
    borderRadius: 50,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  textInputWrapper: {
    height: 40,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
    backgroundColor: "#ddd",
    marginLeft: 10,
    width: screenWidth - 40 - 80 - 30 - 50,
    borderRightWidth: 0,
  },
  textInput: {
    width: "100%",
    height: 40,
    paddingHorizontal: 15,
    alignItems: "center",
  },
  iconWrapper: {
    flexDirection: "row",
    paddingHorizontal: 10,
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48,
    height: 40,
    backgroundColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
    borderLeftWidth: 0,
  },
  navigationStackBar: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  btnBack: {
    zIndex: 99,
  },
  stackBarTitle: {
    position: "absolute",
    width: screenWidth,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    height: 40,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
})
