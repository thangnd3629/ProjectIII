import React from "react"

import styled from "styled-components/native"
import { StyleSheet, View } from "react-native"
import { Dimensions } from 'react-native';
import { Image, Text } from "react-native";
const Container = styled.View`
  width: 100%;
  height: 100%;
  position: relative;
`
const User = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border-color: #1777f2;
  border-width: ${(props) => (props.story ? "3px" : 0)};
`
const UserActive = styled.View`
  width: 15px;
  height: 15px;
  border-radius: 8px;
  background: #4bcb1f;
  position: absolute;
  bottom: -2px;
  right: -2px;
  border-width: 2px;
  border-color: #ffffff;
`

const Avatar2 = ({ source, online, story, size, label, fontSize }) => {
    return (
        <View>
            <Image style={stylesWithState(story, size).user} source={source} story={story} />
            {online && <UserActive />}
            {label &&
                <Text numberOfLines={2} style={{
                    textAlign: "center",
                    fontSize: fontSize == undefined?15:fontSize,
                    fontWeight: 'bold'
                }}>
                    {label}
                </Text>}
        </View>
    )
}

export default Avatar2

const stylesWithState = (story, size) => StyleSheet.create({
    user: {
        width: size,
        height: size,
        borderRadius: size / 2,
        borderColor: "#1777f2",
        borderWidth: story ? 3 : 0,
    }
})