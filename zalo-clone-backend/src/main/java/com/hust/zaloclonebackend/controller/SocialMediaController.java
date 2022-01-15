package com.hust.zaloclonebackend.controller;

import java.security.Principal;
import java.util.List;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.*;

import com.hust.zaloclonebackend.service.ChatService;
import com.hust.zaloclonebackend.service.SocialMediaService;
import com.hust.zaloclonebackend.service.UserService;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.AllArgsConstructor;

@RestController
@CrossOrigin
@Slf4j
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class SocialMediaController {
    SocialMediaService socialMediaService;
    UserService userService;
    ChatService chatService;

    //
    @PostMapping("/post/add")
    public ResponseEntity<?> addPost(@RequestBody ModelAddPost modelAddPost, Principal principal) throws Exception {
        //get User from Session
        User user = userService.findByPhoneNumber(principal.getName());
        ModelAddPostResponse modelAddPostResponse = socialMediaService.addPost(modelAddPost, user);
        return ResponseEntity.status(HttpStatus.OK).body(modelAddPostResponse);
    }
//
    @GetMapping("/post/get/{id}")
    public ResponseEntity<?> getPost(@PathVariable("id") String id,Principal principal) throws Exception {
        log.info("get post id {}", id);
        ModelGetPostResponse modelGetPostResponse = socialMediaService.getPostById(id);
        return ResponseEntity.status(HttpStatus.OK).body(modelGetPostResponse);

    }
//
    @DeleteMapping("/post/delete/{id}")
    public ResponseEntity<?> deletePost(@PathVariable("id") String id,Principal principal) throws Exception {
        log.info("delete post id {}", id);
        ModelDeletePostResponse modelDeletePostResponse = socialMediaService.deletePostById(id);
        return ResponseEntity.ok(modelDeletePostResponse);
    }


    @GetMapping("/post/get-user-list-post")
    public ResponseEntity<?> getUserPosts(Principal principal, Pageable pageable){
        String phoneNumber = principal.getName();
        ModelGetListPostResponse modelGetListPostResponse = socialMediaService.getUserListPosts(pageable, phoneNumber);
        return ResponseEntity.status(200).body(modelGetListPostResponse);
    }

    @GetMapping("/post/get-user-list-post-by-phone-num/{phoneNumber}")
    public ResponseEntity<?> getUserPostsByPhoneNum(Principal principal,@PathVariable("phoneNumber") String phoneNumber, Pageable pageable){
        ModelGetListPostResponse modelGetListPostResponse = socialMediaService.getUserListPosts(pageable, phoneNumber);
        return ResponseEntity.status(200).body(modelGetListPostResponse);
    }

//
    @PostMapping("/post/edit")
    public ResponseEntity<?> editPost(@RequestBody ModelEditPostRequest modelEditPostRequest ){
        log.info("edit post {}", modelEditPostRequest);
        ModelStatusResponse modelStatusResponse = socialMediaService.editPost(modelEditPostRequest);
        return ResponseEntity.status(200).body(modelStatusResponse);
    }
//
    @PostMapping("/report-post")
    public ResponseEntity<?> reportPost(@RequestBody ModelReportPost modelReportPost, Principal principal){
        log.info("report post {}", modelReportPost);
        ModelStatusResponse zaloStatus = socialMediaService.reportPost(modelReportPost, principal.getName());
        return ResponseEntity.status(200).body(zaloStatus);
    }
//
    @PostMapping("/post/{postId}/comment")
    public ResponseEntity<?> addComment(@RequestBody ModelAddCommentRequest modelAddCommentRequest, @PathVariable String postId,Principal principal){
        ModelAddComment modelAddComment = ModelAddComment.builder().comment(modelAddCommentRequest.getComment()).postId(postId).build();
        ModelStatusResponse zaloStatus = socialMediaService.addComment(modelAddComment, principal.getName());
        return ResponseEntity.status(200).body(zaloStatus);
    }
//
    @GetMapping("/post/{postId}/comment")
    public ResponseEntity<?> getCommentPaging(Pageable pageable, @PathVariable("postId") String postId){
        log.info("get comment paging");
        ModelGetCommentPagingResponse modelGetCommentPagingResponse = socialMediaService.getCommentPaging(pageable, postId);
        log.info("modelGetCommentPagingResponse {}", modelGetCommentPagingResponse);
        return ResponseEntity.status(200).body(modelGetCommentPagingResponse);
    }
//
    @PutMapping("/comment/{id}")
    public ResponseEntity<?> editComment(@RequestBody ModelEditCommentRequest modelEditCommentRequest, @PathVariable Long id){
        ModelEditComment modelEditComment = ModelEditComment.builder().comment(modelEditCommentRequest.getComment()).commentId(id).build();
        ModelStatusResponse zaloStatus = socialMediaService.editComment(modelEditComment);
        return ResponseEntity.status(200).body(zaloStatus);
    }

    @PostMapping("/post/like/{postId}")
    public ResponseEntity<?> likePost(Principal principal, @PathVariable("postId") String postId){
        log.info("like post {}", postId);
        ModelLikePostResponse modelLikePostResponse = socialMediaService.likePost(principal.getName(), postId);
        return ResponseEntity.status(200).body(modelLikePostResponse);
    }

    @GetMapping("/post")
    public ResponseEntity<?> getListPostPaging(Pageable pageable, Principal principal){
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdDate").and(Sort.by("modifiedDate")).descending());
        ModelGetListPostResponse modelGetListPostResponse = socialMediaService.getListPostPaging(principal.getName(), pageable);
        return ResponseEntity.status(200).body(modelGetListPostResponse);
    }

    @GetMapping("/friend-request-list")
    public ResponseEntity<?> getFriendRequestList(Pageable pageable, Principal principal){
        log.info("/friend-request-list");
        ModelGetListFriendRequest modelGetListFriendRequest = socialMediaService.getListFriendRequest(principal.getName(), pageable);
        log.info("modelGetListFriendRequest {}", modelGetListFriendRequest);
        return ResponseEntity.status(200).body(modelGetListFriendRequest);
    }

    @GetMapping("/get-friend")
    public ResponseEntity<?> getFriend(Pageable pageable, Principal principal){
        log.info("phone {}", principal.getName());
        List<ModelGetFriend> list = socialMediaService.getFriend(principal.getName());
        log.info("list {}", list);
        return ResponseEntity.status(200).body(list);
    }

    @PostMapping("/handle-friend-request")
    public ResponseEntity<?> handleFriendRequest(Principal principal, @RequestBody ModelHandleFriendRequest req){
        ModelStatusResponse status = socialMediaService.handleFriendRequest(principal.getName(), req);
        return ResponseEntity.status(200).body(status);
    }

    @PostMapping("/send-friend-request/{userId}")
    public ResponseEntity<?> sendFriendRequest(Principal principal, @PathVariable("userId") String userId){
        log.info("send friend request user id {}", userId);
        ModelSendFriendRequestResponse resp = socialMediaService.sendFriendRequest(principal.getName(), userId);
        log.info("response {}", resp);
        return ResponseEntity.status(200).body(resp);
    }

//    @GetMapping("/get-list-conservation")
//    public ResponseEntity<?> getListConservation(Principal principal, Pageable pageable){
//        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("timestamp"));
//        ModelGetListConservation listConservation = zaloService.getListConservationByUser(pageable,principal.getName());
//        return ResponseEntity.status(200).body(listConservation);
//    }
//
//    @PostMapping("/get-message-paging")
//    public ResponseEntity<?> getMessagePaging(Principal principal, @RequestBody ModelGetMessageRequest request, Pageable pageable){
//        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("timestamp"));
//        ModelGetListMessage response = zaloService.getListMessagePaging(pageable, request, principal.getName());
//        return ResponseEntity.status(200).body(response);
//    }



    @GetMapping("/conversation")
    public ResponseEntity<?> getPageConversation(Principal principal, Pageable pageable)
    {
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("timestamp"));
        ModelGetListConversation listConversation = chatService.getListConversation(principal.getName(),pageable);
        return ResponseEntity.status(200).body(listConversation);
    }

    @GetMapping("/conversation/{id}")
    public ResponseEntity<?> getConversationMessages(Principal principal, Pageable pageable, @PathVariable("id") String convId)
    {
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("timestamp"));
        ModelGetConversation conversation = chatService.getConversationMessages(principal.getName(), pageable, convId);

        return ResponseEntity.status(200).body(conversation);
    }



}
