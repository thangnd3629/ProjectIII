import React, { useState, useCallback } from "react"
import { Button, FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { ERROR_MESSAGE } from "../constants/ErrorMessage";
import { SIZE, COLORS } from "../constants/Style";

const MultiFunctionItem = ({ modalVisible, onSetModalVisible }) => {

    const handleModalVisibleChange = useCallback( () => {
        console.log("user press out of modal view");
        onSetModalVisible( false );
    }, [onSetModalVisible]);

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Tao nhom',
            icon: 'addusergroup',
            iconType: 'antdesign'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Them ban',
            icon: 'adduser',
            iconType: 'antdesign'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Quet ma QR',
            icon: 'qrcode',
            iconType: 'antdesign'
        },
    ];

    const renderItem = ({ item, index }) => {

        var itemStyle;
        if ( index == 0 ) {
            itemStyle = { ...styles.item, ...styles.firstItem };
        } else if ( index == (DATA.length - 1) ) {
            itemStyle = { ...styles.item, ...styles.lastItem };
        } else {
            itemStyle = { ...styles.item };
        }

        return (
            <View style={ styles.itemWrapper }>
                <TouchableOpacity style={ itemStyle }>
                    <Icon name={ item.icon } type={ item.iconType }></Icon>
                    <Text style={ styles.text }>{ item.title }</Text>    
                </TouchableOpacity>
            </View>
        );

    }

    return (
        <Modal visible={ modalVisible } animationType="fade" transparent={ true } >
            <TouchableOpacity onPressOut={ () => handleModalVisibleChange() } >
                <FlatList data={ DATA } renderItem={ renderItem }></FlatList>
            </TouchableOpacity>
        </Modal>
    );

}

const styles = StyleSheet.create({

    itemWrapper: {
        flex: 1,
        direction: "rtl", // only work for iOS
        flexDirection: "row-reverse", 
        backgroundColor: COLORS.WHITE,
    },
    
    item: {
        backgroundColor: COLORS.WHITE,
        padding: 10,
        marginVertical: 0,
        marginHorizontal: 10,
        paddingVertical: 5,
        maxWidth: 250,
        borderLeftWidth: SIZE.MEDIUM_BORDER_WIDTH,
        borderRightWidth: SIZE.MEDIUM_BORDER_WIDTH,
        borderBottomWidth: SIZE.MEDIUM_BORDER_WIDTH,
        borderTopWidth: SIZE.MEDIUM_BORDER_WIDTH / 2,
        flex: 1,
        flexDirection: "row",
        direction: "ltr",
        alignItems: "center",
    },
    
    text: {
        fontSize: SIZE.MEDIUM_FONT,
        marginLeft: 10,
    },

    firstItem: {
        marginTop: SIZE.HEADER_HEIGHT, // TODO: hard code
        borderTopWidth: SIZE.MEDIUM_BORDER_WIDTH,
        borderTopRightRadius: SIZE.MEDIUM_BORDER_RADIUS,
        borderTopLeftRadius: SIZE.MEDIUM_BORDER_RADIUS,
    },

    lastItem: {
        borderBottomRightRadius: SIZE.MEDIUM_BORDER_RADIUS,
        borderBottomLeftRadius: SIZE.MEDIUM_BORDER_RADIUS,
        marginBottom: 10000, // TODO: hard code
    }
});

export default MultiFunctionItem;