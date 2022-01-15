import React from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native"
import { Entypo } from "@expo/vector-icons"
export default function ImageGrid({ imgList, removePhotoHandler }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.imgGalery}>
        {imgList.map((img, index) => {
          return (
            <View key={index} style={styles.image}>
              <TouchableOpacity
                style={styles.remove_img}
                onPress={() => removePhotoHandler(img)}
              >
                <Entypo name="squared-cross" size={24} color="black" />
              </TouchableOpacity>
              <Image
                source={{ uri: img }}
                style={{
                  width: 180,
                  height: 200,
                }}
              />
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgGalery: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 10,
  },
  image: {
    margin: 5,
  },
  remove_img: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
})
