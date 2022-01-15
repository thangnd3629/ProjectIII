import React, {useEffect, useState} from "react"

import { View } from "react-native"
import styled from "styled-components/native"
import OptionsMenu from "../components/OptionMenu"

import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { useSelector } from "react-redux"
import Avatar from "./Avatar"

const Container = styled.View``
const Header = styled.View`
  background:white
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
  padding: 0 11px;
  marginBottom:0.8px;
`
const Row = styled.View`
  align-items: center;
  flex-direction: row;
`
const User = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #222121;
`
const Time = styled.Text`
  font-size: 9px;
  color: #747476;
`
const Post = styled.Text`
  background:white
  font-size: 12px;
  color: #222121;
  line-height: 16px;
  padding: 0 11px;
`
const Photo = styled.View`
  margin-top: 9px;
  width: 100%;
  height: 200px;
`
const Footer = styled.View`
  background:white
  padding: 0 11px;
`
const FooterCount = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 9px 0;
`
const IconCount = styled.View`
  background: #1878f3;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`
const TextCount = styled.Text`
  font-size: 11px;
  color: #424040;
`
const Separator = styled.View`
  width: 100%;
  height: 1px;
  background: #f9f9f9;
`
const FooterMenu = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  padding: 9px 0;
`
const Button = styled.TouchableOpacity`
  flex-direction: row;
  margin-right: 20px;
`
const Icon = styled.View`
  margin-right: 6px;
`
const Text = styled.Text`
  font-size: 12px;
  color: #424040;
`
const BottomDivider = styled.View`
  width: 100%;
  height: 9px;
  background: #f0f2f5;
`
const AvatarSection = styled.View`
  height: 40px;
  width: 40px;
`
import * as navigation from "../RouteNavigation"
import FluidGrid from "./FluidGrid"
const Feed = ({
  id,
  described,
  created,
  modified,
  like,
  comment,
  is_liked,
  image,
  video,
  author,
  state,
  is_blocked,
  can_edit,
  can_comment,
  onReport,
  onLike,
}) => {
  const user = useSelector((state) => state.authReducer.user)
  const [isLike, setIsLike] = useState(is_liked)
  const [numLikes, setNumLikes] = useState(like)
  const editPost = () => {
    navigation.navigate("EditPost", {
      id,
      described,
      image,
      video,
    })
  }
  const reportPost = () => {
    onReport(id)
  }

  const deletePost = () => {}

  const initOptionMenu = () => {
    const optionMenu = []
    if (can_edit) optionMenu.push({ option: "Edit", operation: editPost })
    if (user.id === author.id)
      optionMenu.push({ option: "Delete", operation: deletePost })
    else optionMenu.push({ option: "Report", operation: reportPost })

    return optionMenu
  }



  return (
    <>
      <Container>
        <Header>
          <Row>
            <AvatarSection>
              <Avatar source={require("../assets/user1.jpg")} />
            </AvatarSection>
            <View style={{ paddingLeft: 10 }}>
              <User>{author.name}</User>
              <Row>
                <Time>{created}</Time>
                <Entypo name="dot-single" size={12} color="#747476" />
                <Entypo name="globe" size={10} color="#747476" />
              </Row>
            </View>
          </Row>

          <OptionsMenu
            customButton={
              <View style={{ margin: 20 }}>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
              </View>
            }
            buttonStyle={{
              width: 64,
              height: 16,
              margin: 7.5,
              resizeMode: "contain",
            }}
            options={initOptionMenu().map((item) => item.option)}
            actions={initOptionMenu().map((item) => item.operation)}
          />
        </Header>

        <Post>{described}</Post>
        {image.length > 0 && (
          <Photo>
            <FluidGrid
              editable={false}
              images={image}
              base64={true}
              onPress={() => {}}
            />
          </Photo>
        )}

        <Footer>
          <FooterCount>
            <Row>
              <IconCount>
                <AntDesign name="like1" size={12} color="#FFFFFF" />
              </IconCount>
              <TextCount>{numLikes} likes</TextCount>
            </Row>
            <TextCount>{comment} comments</TextCount>
          </FooterCount>

          <Separator />

          <FooterMenu>
            <Button
              onPress={async () => {
                await onLike(id)
                setIsLike(isLike ? 0 : 1)
                setNumLikes((prev) => {
                  if (isLike) {
                    prev = prev - 1
                  } else {
                    prev = prev + 1
                  }
                  return prev
                })
              }}
            >
              <Icon>
                <AntDesign
                  name="hearto"
                  size={24}
                  color={isLike ? "blue" : "black"}
                />
              </Icon>
              <Text>Like</Text>
            </Button>

            <Button
              onPress={() => {
                navigation.navigate("Comment", {
                  postId: id,
                })
              }}
            >
              <Icon>
                <MaterialCommunityIcons
                  name="comment-outline"
                  size={20}
                  color="#424040"
                />
              </Icon>
              <Text>Comment</Text>
            </Button>
          </FooterMenu>
        </Footer>
        <BottomDivider />
      </Container>
    </>
  )
}

export default Feed
