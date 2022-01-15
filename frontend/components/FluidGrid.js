import React, { Component } from "react"
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native"
import { Entypo } from "@expo/vector-icons"
const ImageItem = (props) => {
  const editable = props.editable

  return props.image ? (
    <TouchableOpacity
      style={styles.image_view}
      onPress={(event) => props.onPress(props.image, props.index, event)}
    >
      <TouchableOpacity
        style={styles.remove_img}
        onPress={() => {
          props.onRemove(props.index)
        }}
      >
        {editable && <Entypo name="squared-cross" size={24} color="black" />}
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={{
          uri: props.image,
        }}
      />
    </TouchableOpacity>
  ) : (
    <View />
  )
}

const TwoImages = (props) => {
  return (
    <>
      <ImageItem
        image={props.images[0]}
        onPress={props.onPress}
        index={0}
        onRemove={props.onRemove}
        editable={props.editable}
        base64={props.base64}
      />
      <ImageItem
        image={props.images[1]}
        onPress={props.onPress}
        index={1}
        onRemove={props.onRemove}
        editable={props.editable}
        base64={props.base64}
      />
    </>
  )
}

const renderImages = (
  start,
  overflow,
  images,
  onPress,
  onRemove,
  editable,
  base64
) => {
  return (
    <>
      <ImageItem
        image={images[start]}
        onPress={onPress}
        onRemove={onRemove}
        index={start}
        editable={editable}
        base64={base64}
      />
      {images[start + 1] && (
        <View style={styles.image_view}>
          <ImageItem
            image={images[start + 1]}
            onPress={onPress}
            index={start + 1}
            onRemove={onRemove}
            editable={editable}
            base64={base64}
          />
          {overflow && (
            <TouchableOpacity
              onPress={(event) => onPress(images[start + 1], start + 1, event)}
              style={styles.item_view_overlay}
            >
              <Text style={styles.text}>{`+${images.length - 5}`}</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </>
  )
}

export default class FluidGrid extends Component {
  render() {
    const { images, style, onPress, onRemove, editable, base64 } = this.props
    return images.length > 0 ? (
      <View style={{ ...styles.container_row, ...style }}>
        {images.length < 3 ? (
          <TwoImages
            images={images}
            onPress={onPress}
            onRemove={onRemove}
            editable={editable}
            base64={base64}
          />
        ) : (
          <ImageItem
            image={images[0]}
            onPress={onPress}
            index={0}
            onRemove={onRemove}
            editable={editable}
            base64={base64}
          />
        )}
        {images.length > 2 && (
          <View style={styles.container}>
            {renderImages(
              1,
              false,
              images,
              onPress,
              onRemove,
              editable,
              base64
            )}
          </View>
        )}
        {images.length > 3 && (
          <View style={styles.container}>
            {renderImages(
              3,
              images.length > 4,
              images,
              onPress,
              onRemove,
              editable
            )}
          </View>
        )}
      </View>
    ) : null
  }
}

export const styles = StyleSheet.create({
  container_row: {
    flexDirection: "row",
    padding: 4,
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 4,
  },

  image_view: {
    flex: 1,
    margin: 2,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 6,
    backgroundColor: "grey",
  },

  item_view: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  item_view_overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },

  text: {
    color: "white",
    fontSize: 18,
  },
  remove_img: {
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
  },
})
