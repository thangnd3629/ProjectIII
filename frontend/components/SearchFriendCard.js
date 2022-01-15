import React, { useState } from "react"
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native"
import { Feather } from "@expo/vector-icons"
import Avatar from "./Avatar"
import { fetchWithErrHandler } from "../util/fetchWithErrNotification";
import { API_URL } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_MODAL } from "../action/types";
import { LinearGradient } from "expo-linear-gradient";
export default function SearchFriendCard(props) {
    const userName = props.userName;
    const userId = props.userId;
    const [isSend, setIsSend] = useState(false);
    const auth = useSelector((state) => state.authReducer);
    const dispatch = useDispatch();
    const [friendRequestId, setFriendRequestId] = useState();
    const onSubmit = async () => {
        let myHeaders = new Headers()
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-Auth-Token", `${auth.token}`);

        let requestOptions = {
            method: "POST",
            headers: myHeaders,
            // redirect: "follow",
        }
        const response = await fetchWithErrHandler(
            `${API_URL}/send-friend-request/` + userId,
            requestOptions,
            10000,
            dispatch
        );
        console.log("send friend request response ", response)
        if (response.body.code === 1000) {
            setIsSend(true);
            setFriendRequestId(response.body.id);
        } else {
            dispatch({
                type: SHOW_MODAL,
                payload: {
                    status: "Unknown error",
                    content: response.body.message,
                },
            });
        }
    }

    const onCancel = () => {
        console.log("cancel");
    }
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.avatar}>
                <Avatar source={require("../assets/user1.jpg")} />
            </View>
            <View style={styles.contact}>
                <Text style={styles.name}> {userName} </Text>
                <View style={styles.moreTools}>
                    {!isSend ?
                        <TouchableOpacity onPress={onSubmit}>
                            <LinearGradient
                                colors={["#2980b9", "#6dd5fa"]}
                                start={{ x: 1.0, y: 0.0 }}
                                end={{ x: 0.0, y: 0.0 }}
                                style={styles.buttonStyle}
                            >
                                <Text style={styles.buttonTextStyle}>Kết Bạn</Text>
                            </LinearGradient>
                            {/* <Button
                                title="Kết Bạn"
                                onPress={onSubmit}
                            /> */}
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={onCancel }>
                            <LinearGradient
                                colors={["#2980b9", "#6dd5fa"]}
                                start={{ x: 1.0, y: 0.0 }}
                                end={{ x: 0.0, y: 0.0 }}
                                style={styles.buttonStyle}
                            >
                                <Text style={styles.buttonTextStyle}>Hủy</Text>
                            </LinearGradient>
                            {/* <Button
                                title="Kết Bạn"
                                onPress={onSubmit}
                            /> */}
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
        marginTop: 5
    },
    avatar: {
        height: 40,
        width: 40,
        marginRight: 20,
    },
    contact: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    moreTools: {
        marginLeft: "auto",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    name: {
        fontWeight: "700",
    },
    submit: {
        position: "absolute",
        bottom: 50,
        right: 50,
    },
    buttonStyle: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
        height: 28,
        width: 80,
        padding: 5,
        marginLeft: 80
      },
      buttonTextStyle: {
        color: "white",
        textAlign: "center"
      }
})
