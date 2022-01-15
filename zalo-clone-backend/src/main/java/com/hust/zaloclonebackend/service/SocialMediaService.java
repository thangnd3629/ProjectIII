package com.hust.zaloclonebackend.service;

import java.util.List;

import com.hust.zaloclonebackend.entity.Comment;
import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.*;

import org.springframework.data.domain.Pageable;

public interface SocialMediaService {
    Post save(Post post);

    Post findById(String id) throws Exception;

    List<User> findAllLikers (String id) throws Exception;

    List<Comment> findAllComments (String id) throws Exception;
    ModelDeletePostResponse deletePostById(String id) throws Exception;

    ModelAddPostResponse addPost(ModelAddPost modelAddPost, User user) throws Exception;

    ModelGetPostResponse getPostById(String id) throws Exception;

    ModelGetListPostResponse getUserListPosts(Pageable pageable, String phoneNumber);

    ModelStatusResponse editPost(ModelEditPostRequest modelEditPostRequest);

    ModelStatusResponse reportPost(ModelReportPost modelReportPost, String phoneNumber);

    ModelStatusResponse addComment(ModelAddComment modelAddComment, String phoneNumber);

    ModelGetCommentPagingResponse getCommentPaging(Pageable pageable, String postId);

    ModelStatusResponse editComment(ModelEditComment modelEditComment);

    ModelLikePostResponse likePost(String phoneNumber, String postId);

    ModelGetListPostResponse getListPostPaging(String phoneNumber, Pageable pageable);

    ModelGetListFriendRequest getListFriendRequest(String phoneNumber, Pageable pageable);

    ModelStatusResponse handleFriendRequest(String phoneNumber, ModelHandleFriendRequest request);

    ModelSendFriendRequestResponse sendFriendRequest(String phoneNumber, String userId);

    List<ModelGetFriend> getFriend(String userName);



}
