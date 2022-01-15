import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import ProfileGroup from '../components/ProfileGroup'
import HorizontalOptions from '../components/HorizontalOptions'
import PostToolsGroup from '../components/PostToolsGroup'
import { fetchWithErrHandler } from "../util/fetchWithErrNotification"
import { API_URL } from '../constants/ApiConstant'
import Feed from '../components/Feed'
import { ScrollView } from 'react-native-gesture-handler'

const PeerProfile = props => {
    const fetchSize = 2
    const [refreshing, setRefreshing] = useState(false)
    const [page, setPage] = useState(0)
    const [numNewPostsFetched, setNewNumPostFetch] = useState(null)
    const [feeds, setFeeds] = useState([])
    const auth = useSelector((state) => state.authReducer)
    const phoneNumber = props.route.params["phoneNumber"]
    console.log(props)

    const user = {
        id: "id",
        name: props.route.params["name"],
        bio: "This is bio section",
        avatar: require("../assets/user2.jpg"),
        background: require("../assets/story2.jpg"),
    }

    const sections = {
        data: [
            {
                content: "Image",
                colors: ["#D3959B", "#BFE6BA"],
            },
            {
                content: "Video",
                colors: ["#3E5151", "#DECBA4"],
            },
            {
                content: "Memories",
                colors: ["#FC466B", "#3F5EFB"],
            },
        ],
    }
    const dispatch = useDispatch()
    const fetchNewPosts = async () => {
        try {
            var myHeaders = new Headers()
            myHeaders.append("X-Auth-Token", `${auth.token}`)
            myHeaders.append("Content-Type", "application/json")
            var requestOptions = {
                headers: myHeaders,
                redirect: "follow",
            }

            const response = await fetchWithErrHandler(
                `${API_URL}/post/get-user-list-post-by-phone-num/${phoneNumber}?size=${fetchSize}&page=${page}`,
                requestOptions,
                10000,
                dispatch
            )

            const newPost = response.body.data
            setNewNumPostFetch(newPost.length)

            setFeeds((prevState) => [...prevState, ...newPost])
        } catch (e) {
            console.log(e)
        }
    }

    const onLoadMore = () => {
        if (numNewPostsFetched === fetchSize) {
            setPage((prevState) => prevState + 1)
            return
        }
    }

    const onLikePost = async (id) => {
        try {
            await send(
                `${API_URL}/post/like/${id}`,
                {
                    method: "POST",
                },
                3000,
                dispatch,
                true
            )
        } catch (e) {
            console.log(e)
        }
    }

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        setFeeds([])
        await fetchNewPosts()
        setRefreshing(false)
    }, [])

    useEffect(() => {
        fetchNewPosts()
    }, [page])

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.background}>
                    <ProfileGroup
                        avatar={user.avatar}
                        backgroundImage={user.background}
                        name={user.name}
                        bio={user.bio}
                    />
                </View>

                <View style={styles.feed_container}>
                    <View style={styles.options}>
                        <HorizontalOptions sections={sections} />
                    </View>

                    <PostToolsGroup />
                    <View style={styles.feedGroup}>
                        {feeds.length > 0 && (
                            <FlatList
                                data={feeds}
                                keyExtractor={(item) => item.id}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                                onEndReachedThreshold={0.6}
                                onEndReached={onLoadMore}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Feed
                                            described={item.describe}
                                            author={item.author}
                                            can_edit={true}
                                            like={item.like}
                                            is_liked={item.isLike}
                                            comment={item.numComment}
                                            image={item.image}
                                            id={item.id}
                                            created={item.createAt}
                                            onLike={onLikePost}
                                        />
                                    )
                                }}
                            />
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default PeerProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    feedGroup: {
        flex: 1,
    },
    options: {
        flex: 1,
        marginLeft: 10,
        height: 100,
    },
    backgroundImg: {
        height: 180,
        width: "100%",
    },
    feed_container: {
        flex: 1,
        marginTop: "10%",
    },
    avatarContainer: {
        backgroundColor: "white",
        height: 100,
        width: 100,
        borderRadius: 200,
        position: "absolute",
        alignSelf: "center",
        marginTop: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    blueCircle: {
        height: "95%",
        width: "95%",
        borderRadius: 200,
        borderWidth: 2,
        borderColor: "blue",
        alignItems: "center",
        justifyContent: "center",
    },
    avatar: {
        height: "95%",
        width: "95%",
        borderRadius: 200,
    },
    name: {
        alignSelf: "center",
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 30,
    },
    shortBio: {
        alignSelf: "center",
        fontSize: 16,
        color: "#BBBFB6",
    },
})
