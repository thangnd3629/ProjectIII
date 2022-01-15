import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
const AltDiscoverFriendView = () => {
    const navigation = useNavigation()
    return (
        <View style={{
            display: "flex",
            height: "100%",
            backgroundColor: "white",
            padding: 50,
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={{
                color: "#dddddd",
                fontWeight: "bold",
                fontSize: 30,
                textAlign: "center"
            }}>
                Khám phá thêm nhiều bạn bè
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("DirectoryStack", { screen: "SearchNested" })}>
                <LinearGradient
                    colors={["#2980b9", "#6dd5fa"]}
                    start={{ x: 1.0, y: 0.0 }}
                    end={{ x: 0.0, y: 0.0 }}
                    style={styles.buttonStyle}
                >
                    <Text style={{ color: "white" }}>Tìm kiếm</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default AltDiscoverFriendView

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
    },
    buttonStyle: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 15,
      height: 30,
      width: 80,
      padding: 5,
      marginTop: 20
    }
  })