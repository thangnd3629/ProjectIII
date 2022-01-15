import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { NewStatusInput } from "../components/NewStatusInput"
import FluidGrid from "../components/FluidGrid"

import * as ImagePicker from "expo-image-picker"
export default function EditPost({ route }) {
  const { id, described, image, video } = route.params
  const [postContent, setPostContent] = useState({
    id,
    described,
    images: image,
    video,
  })
  const removePhotoHandler = (index) => {
    console.log(postContent.images)
    const processedImgs = [...postContent.images]
    processedImgs.splice(index, 1)
    setPostContent({ ...postContent, images: processedImgs })
  }
  const addPhotoHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.cancelled) {
      setPostContent({
        ...postContent,
        images: [...postContent.images, { uri: result.uri }],
      })
    }
  }
  return (
    <View style={styles.container}>
      <NewStatusInput
        text={described}
        onChangeText={(text) => {
          setPostContent({ ...postContent, described: text })
        }}
      />
      <FluidGrid
        editable={true}
        images={postContent.images.map((item) => item.uri)}
        onPress={() => console.log("img pressed")}
        onRemove={removePhotoHandler}
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
    flex: 1,
  },
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
