package com.hust.zaloclonebackend.model.response;

import java.util.HashMap;
import java.util.List;

import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.util.EpochConverter;



public class PostResponse {

    public static HashMap<String, String> getData(User user, Post post)
    {
        HashMap<String, String> data = new HashMap<>();
        data.put("id", post.getPostId());
//        data.put("created on", EpochConverter.fromEpochToDate(post.getCreatedDate()));
//        data.put("modified on", EpochConverter.fromEpochToDate(post.getModifiedDate()));
        data.put("likes", "" + post.getLikers().size());
        data.put("comments", "" + post.getComments());
        List<Post> likedPost = user.getLikedPosts();
        data.put("is_liked", (likedPost != null && likedPost.contains(post))? "1" : "0");
        return data;
    }

    public static HashMap<String, String> getAuthor(User user)
    {
        HashMap<String, String> author = new HashMap<>();
        author.put("id", user.getUserId());
        author.put("name",user.getName());
        author.put("avatar", user.getAvatarLink());

        return author;
    }
}
