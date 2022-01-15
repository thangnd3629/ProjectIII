import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Avatar2 from '../components/Avatar2'
import CustomHeader from '../components/CustomHeader'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { Divider } from "react-native-paper"
const UserInboxOption = props => {
    return (
        <View style={styles.container}>
            <CustomHeader navigation={props.navigation}/>
            <View style={styles.avatarContainer}>
                <Avatar2
                    size={100}
                    source={require("../assets/user1.jpg")}
                    label={props.route.params.name}
                    fontSize={18}
                />

                <View style={styles.optionsBelowAvatar}>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            <FontAwesome style={{ alignSelf: "center" }} name="user-circle" size={40} color="grey" />

                            <Text numberOfLines={2} style={{
                                textAlign: "center",
                                fontSize: 10,
                                paddingTop: 8
                            }}>
                                {"Profile"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.iconContainer}>
                        <TouchableOpacity>
                            <FontAwesome style={{ alignSelf: "center" }} name="pencil-square" size={40} color="grey" />
                            <Text numberOfLines={2} style={{
                                textAlign: "center",
                                fontSize: 10,
                                paddingTop: 8
                            }}>
                                Set {"\n"} Nickname
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.mainOptionContainer}>
                <TouchableOpacity>
                    <View style={styles.option}>
                        <View style={styles.mainOptionIcon}>
                            <AntDesign name="delete" size={24} color="grey" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style ={{fontSize:15}}>
                                Block user
                            </Text>

                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ paddingLeft: 50 }}><Divider /></View>
                <TouchableOpacity>
                    <View style={styles.option}>
                        <View style={styles.mainOptionIcon}>
                            <AntDesign name="closecircleo" size={24} color="grey" />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style ={{fontSize:15}}>
                                Delete conversation
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            <View>

            </View>
        </View>
    )
}

export default UserInboxOption

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    avatarContainer: {
        display: "flex",
        height: 260,
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
        padding: 10
    },
    optionsBelowAvatar: {
        display: "flex",
        paddingTop: 20,
        justifyContent: 'center',
        flexDirection: "row"
    },
    iconContainer: {
        display: "flex",
        margin: 25,
        width: 100,
        flexDirection: "column",
        alignItems: "center",
    },
    mainOptionContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        width: "100%"
    },
    option: {
        display: 'flex',
        height: 40,
        padding: 2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        
    },
    mainOptionIcon: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 50
    }

})