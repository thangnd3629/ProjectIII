import React, { useState } from "react"
import { Button, FlatList, Modal, Text, TouchableOpacity, View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { Icon } from "react-native-elements";
import HeaderWithSearchBar from "../components/HeaderWithSearchBar";
import MessageContainer from "../components/MessageContainer";
import MultiFunctionItem from "../components/MultiFunctionList";
import { COLORS, SIZE } from "../constants/Style";

const Message = [
    {
        id: '1',
        name: 'Jenny Doe',
        userAvatar: require('../assets/users/user-1.jpg'),
        lastMessageTime: '4 mins ago',
        lastMessageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '2',
        name: 'John Doe',
        userAvatar: require('../assets/users/user-1.jpg'),
        lastMessageTime: '2 hours ago',
        lastMessageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '3',
        name: 'Ken William',
        userAvatar: require('../assets/users/user-1.jpg'),
        lastMessageTime: '1 hours ago',
        lastMessageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '4',
        name: 'Selina Paul',
        userAvatar: require('../assets/users/user-1.jpg'),
        lastMessageTime: '1 day ago',
        lastMessageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
    {
        id: '5',
        name: 'Christy Alex',
        userAvatar: require('../assets/users/user-1.jpg'),
        lastMessageTime: '2 days ago',
        lastMessageText:
            'Hey there, this is my test for a post of my social app in React Native.',
    },
];

const Main = ( props ) => {

    const [modalVisible, setModalVisible] = useState(false);


    const headerPlusButton = <TouchableOpacity>
                                <Icon name='plus' type='entypo' color='white' size= { SIZE.MEDIUM_ICON } onPress={ () => setModalVisible(true) }></Icon>
                            </TouchableOpacity>;

    return (
        <View>

            {/* header */}
            <HeaderWithSearchBar rightComponent={ headerPlusButton }></HeaderWithSearchBar>
            
            <MultiFunctionItem  modalVisible={ modalVisible } onSetModalVisible={ setModalVisible }></MultiFunctionItem>
        
            <View style={ modalVisible ? { ...styles.container, ...styles.darkBackground } : { ...styles.container } }>
                <FlatList data={ Message } keyExtractor={ item => item.id } renderItem={ ({ item }) => ( <MessageContainer id={ item.id } userAvatar={ item.userAvatar } name={ item.name } lastMessageTime={ item.lastMessageTime } lastMessageText={ item.lastMessageText }></MessageContainer> ) }>

                </FlatList>
            </View>

        </View>
    );

}

const styles = StyleSheet.create({

    container: {
        width: '100%',
    },

    darkBackground: {
        backgroundColor: COLORS.GRAY,
    },


});

export default Main;