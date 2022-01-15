import React, { Component } from "react"
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import FontAweSome5 from "react-native-vector-icons/FontAwesome5"
import * as navigation from "../RouteNavigation"
class GroupPostTool extends Component {
  constructor(props) {
    super(props)
  }
  onLiveStreamPressHandler() {}
  onPhotoUploaderPressHandler() {}
  onCheckInPressHandler() {}
  onFullPostToolPressHandler() {
    navigation.navigate("AddPost")
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.postToolWrapper}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.userAvatarWrapper}
          >
            <Image
              source={require("../assets/background-blue-pattern-geometric-style-blue-geometric-pattern-135451784.jpg")}
              style={styles.userAvatar}
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onFullPostToolPressHandler.bind(this)}
            style={styles.postInputWrapper}
          >
            <View
              style={{
                ...styles.postInput,
              }}
            >
              <Text>What are you thinking ?</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.postOptionsWrapper}>
          <TouchableOpacity
            onPress={this.onLiveStreamPressHandler}
            activeOpacity={0.5}
            style={styles.postOptionItemWrapper}
          >
            <View style={styles.postOptionItem}>
              <FontAweSome5
                style={styles.postOptionIcon}
                name="video"
                color="red"
                size={16}
              />
              <Text>Live Stream</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onPhotoUploaderPressHandler}
            activeOpacity={0.5}
            style={styles.postOptionItemWrapper}
          >
            <View
              style={{
                ...styles.postOptionItem,
                ...styles.postOptionItemMiddle,
              }}
            >
              <FontAweSome5
                style={styles.postOptionIcon}
                name="image"
                color="green"
                size={16}
              />
              <Text>Photo</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onCheckInPressHandler}
            activeOpacity={0.5}
            style={styles.postOptionItemWrapper}
          >
            <View style={styles.postOptionItem}>
              <FontAweSome5
                style={styles.postOptionIcon}
                name="map-marker-alt"
                color="red"
                size={16}
              />
              <Text>Check in</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.authReducer,
  }
}
export default connect(mapStateToProps, null)(GroupPostTool)
const styles = StyleSheet.create({
  container: {
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
  },
  postToolWrapper: {
    padding: 10,
    flexDirection: "row",
  },
  postOptionsWrapper: {
    flexDirection: "row",
    height: 40,
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    alignItems: "center",
  },
  postOptionItemWrapper: {
    flex: 1,
    height: 40,
    justifyContent: "center",
  },
  postOptionItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  postOptionItemMiddle: {
    borderRightColor: "#ddd",
    borderRightWidth: 1,
    borderLeftColor: "#ddd",
    borderLeftWidth: 1,
  },
  postOptionIcon: {
    marginRight: 5,
  },
  postInputWrapper: {
    borderRadius: 48,
    flex: 1,
    marginLeft: 5,
  },
  postInput: {
    height: 40,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  userAvatarWrapper: {},
})
