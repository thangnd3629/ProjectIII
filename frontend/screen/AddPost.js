import React, { useState, useEffect, useCallback } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Button,
} from "react-native"
import { NewStatusInput } from "../components/NewStatusInput"
import FluidGrid from "../components/FluidGrid"
import { API_URL } from "../config"
import * as ImagePicker from "expo-image-picker"
import { useSelector, useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
import { SHOW_MODAL } from "../action/types"
export default function AddPost({}) {
  const [statusContent, setContent] = useState("")
  const [chosenImgs, setChosenImgs] = useState([])
  const auth = useSelector((state) => state.authReducer)

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const addPhotoHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      let fileExtension = result.uri.substr(result.uri.lastIndexOf(".") + 1)

      const newImgBase64 = { ...result }
      newImgBase64.base64 = `data:image/${fileExtension};base64,${result.base64}`
      setChosenImgs([...chosenImgs, newImgBase64])
    }
  }
  const removePhotoHandler = (index) => {
    const processedImgs = [...chosenImgs]
    processedImgs.splice(index, 1)

    setChosenImgs(processedImgs)
  }

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <Button title="Post" onPress={postNewFeedHandler} />,
    })
  }, [statusContent, chosenImgs])

  const postNewFeedHandler = async () => {
    var myHeaders = new Headers()
    myHeaders.append("X-Auth-Token", `${auth.token}`)
    myHeaders.append("Content-Type", "application/json")

    var raw = JSON.stringify({
      describe: statusContent,
      image: chosenImgs.map((image) => image["base64"]),
    })

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    }
    try {
      const response = await fetchWithErrHandler(
        `${API_URL}/post/add`,
        requestOptions,
        10000,
        dispatch
      )
      if (response.body.code === 1000) {
        dispatch({
          type: SHOW_MODAL,
          payload: {
            content: "Posted",
          },
        })
        navigation.goBack()
        return
      }
    } catch (e) {
      console.log("why not do anything")
      console.log(e)
    }
  }
  return (
    <View style={styles.container}>
      <NewStatusInput
        placeholder="Bạn đang nghĩ gì"
        onChangeText={(text) => {
          setContent(text)
        }}
      ></NewStatusInput>
      <FluidGrid
        images={chosenImgs.map((item) => item.uri)}
        onPress={() => console.log("img pressed")}
        onRemove={removePhotoHandler}
        editable={true}
      />
      <TouchableOpacity style={styles.optionTitle} onPress={addPhotoHandler}>
        <Text style={{ fontSize: 16 }}>Add to your post</Text>
        <View style={styles.optionImagesWrapper}>
          <Image
            style={styles.optionImage}
            source={require("../assets/icons/photo.png")}
          ></Image>
          <Image
            style={styles.optionImage}
            source={require("../assets/icons/friend.png")}
          ></Image>
          <Image
            style={styles.optionImage}
            source={require("../assets/icons/emoji.png")}
          ></Image>
          <Image
            style={styles.optionImage}
            source={require("../assets/icons/gps.png")}
          ></Image>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"white",
    flex: 1,
  },
  footer: {},
  optionTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    height: 55,
    alignItems: "center",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
  },
  optionImagesWrapper: {
    flexDirection: "row",
    zIndex: 1,
    justifyContent: "space-around",
    width: "50%",
  },
})
