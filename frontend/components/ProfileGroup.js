import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

const ProfileGroup = ({avatar, backgroundImage, name, bio}) => {
    return (
        <View>
            <Image
                style={styles.backgroundImg}
                source={backgroundImage}
            ></Image>
            <View style={styles.avatarContainer}>
                <View style={styles.blueCircle}>
                    <Image style={styles.avatar} source={avatar}></Image>
                </View>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.shortBio}> {bio}</Text>
        </View>
    )
}

export default ProfileGroup

const styles = StyleSheet.create({
    backgroundImg: {
      height: 180,
      width: "100%",
    },
    avatarContainer:{
      backgroundColor:"white",
      height:100,
      width:100,
      borderRadius:200,
      position:'absolute',
      alignSelf:"center",
      marginTop:100,
      alignItems:"center",
      justifyContent:"center"
    },
    blueCircle:{
      height:"95%",
      width:"95%",
      borderRadius:200,
      borderWidth:2,
      borderColor:'blue',
      alignItems:"center",
      justifyContent:"center"
    },
    avatar:{
      height:"95%",
      width:"95%",
      borderRadius:200
    },
    name:{
      alignSelf:"center",
      marginTop:20,
      fontWeight:"bold",
      fontSize:30
    },
    shortBio:{
      alignSelf:"center",
      fontSize:16,
      color:"#BBBFB6"
    }
  })
