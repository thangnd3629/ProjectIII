package com.hust.zaloclonebackend.util;

import java.util.HashMap;

import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;

public class ResponseProducer {

    public static HashMap<String, String> getPostAuthor(User user)
    {
        HashMap<String, String> author = new HashMap<>();
        author.put("id", user.getUserId());
        author.put("name",user.getName());
        author.put("avatar", user.getAvatarLink());
        return author;
    }

    public static HashMap<String, String> getPostData(User user, Post post)
    {
        HashMap<String, String> author = new HashMap<>();
        author.put("id", user.getUserId());
        author.put("name",user.getName());
        author.put("avatar", user.getAvatarLink());
        return author;
    }
}
