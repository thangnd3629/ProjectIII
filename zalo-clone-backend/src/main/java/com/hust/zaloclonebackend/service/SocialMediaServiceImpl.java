package com.hust.zaloclonebackend.service;

import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import com.hust.zaloclonebackend.entity.*;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.*;

import com.hust.zaloclonebackend.repo.*;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;

import javax.transaction.Transactional;
import javax.xml.bind.DatatypeConverter;

@org.springframework.stereotype.Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class SocialMediaServiceImpl implements SocialMediaService {


    private PostRepo postRepo;
    private ImageRepo imageRepo;
    private UserRepo userRepo;
    private PostPagingAndSortingRepo postPagingAndSortingRepo;
    private ReportRepo reportRepo;
    private CommentRepo commentRepo;
    private CommentPagingAndSortingRepo commentPagingAndSortingRepo;
    private FriendRequestRepo friendRequestRepo;
    private FriendRequestPagingAndSortingRepo friendRequestPagingAndSortingRepo;
    private RelationShipRepo relationShipRepo;
//    private MessageRepo messageRepo;
//    private MessageSortingAndPagingRepo messageSortingAndPagingRepo;

    @Override
    public Post save(Post post) {
        return postRepo.save(post);
    }

    @Override
    public Post findById(String id) throws Exception {
        if (postRepo.existsById(id)) return postRepo.findById(id).get();
        else throw new Exception("No user found"); //custom for handler later
    }

    @Override
    public List<User> findAllLikers(String id) throws Exception {
        if (!postRepo.existsById(id)) throw new Exception("No user found"); //custom for handler later
        Post post = postRepo.findById(id).get();
        return post.getLikers();
    }

    @Override
    public List<Comment> findAllComments(String id) throws Exception {
        if (!postRepo.existsById(id)) throw new Exception("No user found"); //custom for handler later
        Post post = postRepo.findById(id).get();
        return post.getComments();
    }

    @Override
    public ModelDeletePostResponse deletePostById(String id) throws Exception {
        Post p = postRepo.findPostByPostId(id);
        imageRepo.deleteAllByPost(p);
        commentRepo.deleteAllByPost(p);
        postRepo.deletePostByPostId(id);
        return ModelDeletePostResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    @Transactional
    public ModelAddPostResponse addPost(ModelAddPost modelAddPost, User user) throws Exception {

        try {
            Post post = Post.builder()
                    .poster(user)
                    .content(modelAddPost.getDescribe())
                    .build();
            Post finalPost = postRepo.save(post);
            int index = 0;
            for (String image : modelAddPost.getImage()) {
                String[] parts = image.split(",");
                byte[] data = DatatypeConverter.parseBase64Binary(parts[1]);

                String extension = image.substring(image.indexOf("/") + 1, image.indexOf(";"));
                String imgPath = String.format("assets/images/%s-%s.%s", post.getPostId(), index++, extension);
                try (OutputStream stream = new FileOutputStream(imgPath);) {
                    stream.write(data);
                    Image image1 = Image.builder()
                            .post(finalPost)
                            .value(imgPath)
                            .build();
                    imageRepo.save(image1);
                } catch (FileNotFoundException e) {
                    System.out.println("File not found in index");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }


            return ModelAddPostResponse.builder()
                    .code(ZaloStatus.OK.getCode())
                    .message(ZaloStatus.OK.getMessage())
                    .id(finalPost.getPostId())
                    .url("/" + user.getPhoneNumber() + "/" + post.getPostId())
                    .build();
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public String loadAndConvertImageToBase64(String imgPath) {
        try {
            File f = new File(imgPath);
            String extension = imgPath.substring(imgPath.indexOf(".") + 1, imgPath.length());
            FileInputStream fileInputStreamReader = new FileInputStream(f);
            byte[] bytes = new byte[(int) f.length()];
            fileInputStreamReader.read(bytes);

            String base64 = new String(Base64.encodeBase64(bytes), "UTF-8");
            return String.format("data:image/%s;base64,%s", extension, base64);
        } catch (FileNotFoundException e) {
            log.warn(e.getMessage());
        } catch (UnsupportedEncodingException e) {
            log.warn(e.getMessage());
        } catch (IOException e) {
            log.warn(e.getMessage());
        }
        return null;


    }

    @Override
    public ModelGetPostResponse getPostById(String id) throws Exception {
        try {
            Post post = postRepo.findPostByPostId(id);
            return convertPostToModelGetPostResponse(post);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private ModelGetListPostBody convertPostToModelGetListPostBody(Post post, User currentUser) {
        Integer isLike = 0;
        User poster = post.getPoster();
        for (User u : post.getLikers()) {
            if (u.getPhoneNumber().equals(currentUser.getPhoneNumber())) {
                isLike = 1;
            }
        }
        ModelAuthor modelAuthor = ModelAuthor.builder()
                .avartar(poster.getAvatarLink())
                .name(poster.getName())
                .id(poster.getUserId())
                .build();
        List<String> images = imageRepo.findAllImageValueByPost(post);
        List<String> encodedImgs = images.stream().map(image -> {
            String base64 = null;

            base64 = this.loadAndConvertImageToBase64(image);

            return base64;
        }).collect(Collectors.toList());
        return ModelGetListPostBody.builder()
                .id(post.getPostId())
                .createAt(post.getCreatedDate())
                .describe(post.getContent())
                .numComment(post.getComments().size())
                .like(post.getLikers().size())
                .isLike(isLike)
                .author(modelAuthor)
                .image(encodedImgs)
                .build();
    }

    private ModelGetPostResponse convertPostToModelGetPostResponse(Post post) {
        Integer isLike = 0;
        User poster = post.getPoster();
        for (User u : post.getLikers()) {
            if (u.getPhoneNumber().equals(poster.getPhoneNumber())) {
                isLike = 1;
            }
        }
        List<String> images = imageRepo.findAllImageValueByPost(post);
        List<String> encodedImgs = images.stream().map(image -> {
            String base64 = null;

            base64 = this.loadAndConvertImageToBase64(image);

            return base64;
        }).collect(Collectors.toList());
        ModelAuthor modelAuthor = ModelAuthor.builder()
                .avartar(poster.getAvatarLink())
                .name(poster.getName())
                .id(poster.getUserId())
                .build();

        ModelGetPostBody modelGetPostBody = ModelGetPostBody.builder()
                .id(post.getPostId())
                .createAt(post.getCreatedDate())
                .described(post.getContent())
                .comment(post.getComments().size())
                .like(post.getLikers().size())
                .is_Like(isLike)
                .image(encodedImgs)
                .author(modelAuthor)
                .build();

        return ModelGetPostResponse.builder()
                .data(modelGetPostBody)
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelGetListPostResponse getListPostPaging(String phoneNumber, Pageable pageable) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        List<Post> list = postPagingAndSortingRepo.getPostNewFeedByUser(pageable, user);
        List<ModelGetListPostBody> list1 = list.stream().map(post -> convertPostToModelGetListPostBody(post, user)).collect(Collectors.toList());
        return ModelGetListPostResponse.builder()
                .message(ZaloStatus.OK.getMessage())
                .code(ZaloStatus.OK.getCode())
                .data(list1)
                .build();
    }

    @Override
    public ModelGetListFriendRequest getListFriendRequest(String phoneNumber, Pageable pageable) {
        log.info("pageable {}", pageable);
        User toUser = userRepo.findUserByPhoneNumber(phoneNumber);
        List<FriendRequest> list = friendRequestPagingAndSortingRepo.findAllByToUser(pageable, toUser);
        log.info("list {}", list.size());
        List<ModelGetFriendRequest> data = list.stream()
                .map(friendRequest -> convertUserInfoToModelGetFriendRequest(friendRequest.getFromUser(), friendRequest.getCreatedDate()))
                .collect(Collectors.toList());


        return ModelGetListFriendRequest.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .data(data)
                .build();
    }

    @Override
    public ModelStatusResponse handleFriendRequest(String phoneNumber, ModelHandleFriendRequest request) {
        log.info("request {}", request);
        User toUSer = userRepo.findUserByPhoneNumber(phoneNumber);
        User fromUser = userRepo.findUserByUserId(request.getUserId());
        log.info("touser {} fromuser {}", toUSer.getPhoneNumber(), fromUser.getPhoneNumber());
        if (request.getIsAccept() == 1) {
            Relationship relationship = Relationship.builder()
                    .userA(fromUser)
                    .userB(toUSer)
                    .build();
            relationShipRepo.save(relationship);
            log.info("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
            Relationship relationship1 = Relationship.builder()
                    .userA(toUSer)
                    .userB(fromUser)
                    .build();
            relationShipRepo.save(relationship1);
        }
        log.info("11111");
        FriendRequest friendRequest = friendRequestRepo.findFriendRequestByFromUserAndToUser(fromUser, toUSer);
        if (friendRequest != null)
            friendRequestRepo.deleteById(friendRequest.getId());
//        friendRequestRepo.deleteByFromUserAndToUser(fromUser, toUSer);
        log.info("222");

        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelSendFriendRequestResponse sendFriendRequest(String phoneNumber, String userId) {
        User fromUser = userRepo.findUserByPhoneNumber(phoneNumber);
        User toUser = userRepo.findUserByUserId(userId);
        Relationship relationship = relationShipRepo.findRelationshipByUserAAndUserB(fromUser, toUser);
        log.info("relationship {}", relationship);
        if (relationship != null) {
            return ModelSendFriendRequestResponse.builder()
                    .code(8888)
                    .message("They are friend")
                    .build();
        }
        FriendRequest friendRequest = friendRequestRepo.save(FriendRequest.builder()
                .fromUser(fromUser)
                .toUser(toUser)
                .createdDate(new Date())
                .build());
        return ModelSendFriendRequestResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .id(friendRequest.getId())
                .build();
    }

    @Override
    public List<ModelGetFriend> getFriend(String userName) {
        User userA = userRepo.findUserByPhoneNumber(userName);
        List<User> users = relationShipRepo.getFriendByUser(userA);
        users.add(userA);
        return users.stream().map(this::convertUserToFriend).collect(Collectors.toList());
    }

    private ModelGetFriend convertUserToFriend(User user){
        return ModelGetFriend.builder()
                .name(user.getName())
                .phoneNumber(user.getPhoneNumber())
                .build();
    }
//
//    @Override
//    public ModelGetListConservation getListConservationByUser(Pageable pageable, String phoneNumber) {
//        User user = userRepo.findUserByPhoneNumber(phoneNumber);
//        List<Message> list = messageSortingAndPagingRepo.getListMessageWithConservationId(pageable, user);
//        List<ModelConservation> data = new ArrayList<>();
//        int numNewMessage = 0;
//        for (Message message : list) {
//            ModelLastMessage lastMessage = ModelLastMessage.builder()
//                    .message(message.getContent())
//                    .createdAt(message.getTimestamp())
//                    .unread(message.getSeen())
//                    .build();
//            ModelAuthor author = ModelAuthor.builder()
//                    .id(message.getSender().getUserId())
//                    .name(message.getSender().getName())
//                    .avartar(message.getSender().getAvatarLink())
//                    .build();
//            ModelConservation conservation = ModelConservation.builder()
//                    .id(message.getConservationId())
//                    .lastMessage(lastMessage)
//                    .partner(author)
//                    .build();
//            numNewMessage += 1 - (message.getSeen() == 0 ? 0 : 1);
//            data.add(conservation);
//        }
//        return ModelGetListConservation.builder()
//                .numNewMessage(numNewMessage)
//                .code(ZaloStatus.OK.getCode())
//                .message(ZaloStatus.OK.getMessage())
//                .data(data)
//                .build();
//
//    }
//
//    @Override
//    public ModelGetListMessage getListMessagePaging(Pageable pageable, ModelGetMessageRequest request, String phoneNumber) {
//        List<Message> list = messageSortingAndPagingRepo.findAllByConservationId(pageable, request.getConservationId());
//        List<ModelMessageConservation> data = new ArrayList<>();
//        for (Message message : list) {
//            ModelAuthor author = ModelAuthor.builder()
//                    .id(message.getSender().getUserId())
//                    .name(message.getSender().getName())
//                    .avartar(message.getSender().getAvatarLink())
//                    .build();
//            ModelMessage modelMessage = ModelMessage.builder()
//                    .message(message.getContent())
//                    .messageId(message.getMessageId())
//                    .unread(1 - message.getSeen())
//                    .created(message.getTimestamp())
//                    .sender(author)
//                    .build();
//            ModelMessageConservation modelMessageConservation = ModelMessageConservation.builder()
//                    .conversation(modelMessage)
//                    .isBlocked(0)
//                    .build();
//            data.add(modelMessageConservation);
//        }
//        return ModelGetListMessage.builder()
//                .code(ZaloStatus.OK.getCode())
//                .message(ZaloStatus.OK.getMessage())
//                .data(data)
//                .build();
//    }


    private ModelGetFriendRequest convertUserInfoToModelGetFriendRequest(User user, Date date) {
        return ModelGetFriendRequest.builder()
                .avatar(user.getAvatarLink())
                .userName(user.getName())
                .id(user.getUserId())
                .created(date)
                .build();
    }


    @Override
    public ModelGetListPostResponse getUserListPosts(Pageable pageable, String phoneNumber) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("createdDate").descending());
        List<Post> list = postPagingAndSortingRepo.findAllByPoster(pageable, user);

        List<ModelGetListPostBody> modelGetPostResponseArrayList = new ArrayList<>();
        list.forEach(post -> {
            User poster = post.getPoster();
            ModelAuthor modelAuthor = ModelAuthor.builder()
                    .avartar(poster.getAvatarLink())
                    .name(poster.getName())
                    .id(poster.getUserId())
                    .build();
            List<String> images = imageRepo.findAllImageValueByPost(post);
            List<String> encodedImgs = images.stream().map(image -> {
                String base64 = null;
                base64 = this.loadAndConvertImageToBase64(image);
                return base64;
            }).collect(Collectors.toList());
            ModelGetListPostBody modelGetPostBody = ModelGetListPostBody.builder()
                    .author(modelAuthor)
                    .id(post.getPostId())
                    .createAt(post.getCreatedDate())
                    .describe(post.getContent())
                    .numComment(post.getComments().size())
                    .like(post.getLikers().size())
                    .image(encodedImgs)
                    .build();


            modelGetPostResponseArrayList.add(modelGetPostBody);
        });

        ModelGetListPostResponse modelGetListPostResponse = ModelGetListPostResponse.builder()

                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .data(modelGetPostResponseArrayList)
                .build();
        return modelGetListPostResponse;
    }

    @Override
    public ModelStatusResponse editPost(ModelEditPostRequest modelEditPostRequest) {
        Post post = postRepo.findPostByPostId(modelEditPostRequest.getId());
        modelEditPostRequest.getImage().forEach(image -> {
            Image image1 = Image.builder()
                    .post(post)
                    .value(image)
                    .build();
            imageRepo.save(image1);
        });
        modelEditPostRequest.getImageDelId().forEach(s -> imageRepo.deleteById(s));
        postRepo.save(post);
        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelStatusResponse reportPost(ModelReportPost modelReportPost, String phoneNumber) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        Post post = postRepo.findPostByPostId(modelReportPost.getId());
        if (post == null) {
//            return ZaloStatus.POST_NOT_EXISTED;
            return ModelStatusResponse.builder()
                    .code(ZaloStatus.POST_NOT_EXISTED.getCode())
                    .message(ZaloStatus.POST_NOT_EXISTED.getMessage())
                    .build();
        }
        Report report = Report.builder()
                .post(post)
                .detail(modelReportPost.getDetails())
                .subject(modelReportPost.getSubject())
                .user(user)
                .build();
        reportRepo.save(report);
        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelStatusResponse addComment(ModelAddComment modelAddComment, String phoneNumber) {
        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        Post post = postRepo.findPostByPostId(modelAddComment.getPostId());
        Comment comment = Comment.builder()
                .commentOwner(user)
                .post(post)
                .content(modelAddComment.getComment())
                .timestamp(new Date())
                .build();
        commentRepo.save(comment);
        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .id(comment.getCommentId())
                .build();
    }

    @Override
    public ModelGetCommentPagingResponse getCommentPaging(Pageable pageable, String postId) {
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("timestamp").ascending());
        Post post = postRepo.findPostByPostId(postId);
        Page<Comment> commentPage = commentPagingAndSortingRepo.findAllByPost(post, pageable);
        List<ModelGetCommentResponse> list = new ArrayList<>();
        commentPage.forEach(comment -> {
            ModelCommenterResponse modelCommenterResponse = ModelCommenterResponse.builder()
                    .name(comment.getCommentOwner().getName())
                    .phoneNumber(comment.getCommentOwner().getPhoneNumber())
                    .avatar(comment.getCommentOwner().getAvatarLink())
                    .build();

            ModelGetCommentResponse modelGetCommentResponse = ModelGetCommentResponse.builder()
                    .comment(comment.getContent())
                    .commenter(modelCommenterResponse)
                    .createAt(comment.getTimestamp())
                    .id(comment.getCommentId())
                    .build();
            list.add(modelGetCommentResponse);
        });
        return ModelGetCommentPagingResponse.builder()
                .data(list)
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelStatusResponse editComment(ModelEditComment modelEditComment) {
        Comment comment = commentRepo.findCommentByCommentId(modelEditComment.getCommentId());
        comment.setContent(modelEditComment.getComment());
        return ModelStatusResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public ModelLikePostResponse likePost(String phoneNumber, String postId) {
        Post post = postRepo.findPostByPostId(postId);
        User u = userRepo.findUserByPhoneNumber(phoneNumber);
        if (post.getLikers().contains(u)) {

            post.getLikers().remove(u);
        } else {
            post.getLikers().add(u);
        }

        postRepo.save(post);
        ModelLikePostResponse modelLikePostResponse = ModelLikePostResponse.builder()
                .like(post.getLikers().size())
                .build();
        return modelLikePostResponse;
    }


}
