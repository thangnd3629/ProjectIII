import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import { COLORS, SIZE } from '../constants/Style';

const MessageContainer = (props) => {
    
    // props = {id, userAvatar, name, lastMessageTime, lastMessageText}

    return (
        <TouchableOpacity style={ styles.messageWrapper }>
            <View style={ styles.userInfo }>
                <View style={ styles.userAvatarWrapper }>
                    <Image style={ styles.userAvatar } source={ props.userAvatar }></Image>
                </View>

                <View style={ styles.textSection }>
                    <View style={ styles.userInfoText}>
                        <Text style={ styles.userName }>{ props.name }</Text>
                        <Text style={ styles.lastMessageTime }>{ props.lastMessageTime }</Text>
                    </View>
                    <Text style={ styles.lastMessageText }>{ props.lastMessageText }</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({

    messageWrapper: {
        width: '80%',
    },

    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    userAvatarWrapper: {
        paddingVertical: 15,
        paddingHorizontal: 10,
    },

    userAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    textSection: {
        flexDirection: 'column',
        justifyContent: 'center',
    },

    userInfoText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },

    userName: {
        fontSize: SIZE.MEDIUM_FONT,
        fontWeight: 'bold'
    },

    lastMessageTime: {
        fontSize: SIZE.SMALL_FONT,
        color: COLORS.GRAY,
    },

    lastMessageText: {
        fontSize: SIZE.SMALL_FONT,
        borderBottomWidth: 0.5,
    },
})

export default MessageContainer;