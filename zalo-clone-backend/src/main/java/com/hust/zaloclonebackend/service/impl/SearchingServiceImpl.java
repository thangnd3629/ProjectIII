package com.hust.zaloclonebackend.service.impl;

import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.request.SearchingRequest;
import com.hust.zaloclonebackend.model.response.*;
import com.hust.zaloclonebackend.repo.MessageSortingAndPagingRepo;
import com.hust.zaloclonebackend.repo.UserPagingAndSortingRepo;
import com.hust.zaloclonebackend.service.SearchingService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
public class SearchingServiceImpl implements SearchingService {

    @Autowired
    UserPagingAndSortingRepo userPagingAndSortingRepo;

    @Autowired
    MessageSortingAndPagingRepo messageSortingAndPagingRepo;

    @Override
    public UserSearchingResponse searchUserByKeyword(Pageable pageable, SearchingRequest request) {
        log.info("Start search user with request " + request.toString());

        if (isNotValidRequest(request)) {
            return UserSearchingResponse.builder()
                    .zaloStatus(ZaloStatus.PARAMETER_VALUE_IS_INVALID)
                    .build();
        }

        Set<UserResponse> userResponses = getUsersResponse(pageable, request);

        return UserSearchingResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .data(userResponses)
                .build();
    }

    @Override
    public MessageSearchingResponse searchMessagesByKeyword(Pageable pageable, SearchingRequest request) {
        log.info("Start search user with request " + request.toString());

        if (isNotValidRequest(request)) {
            return MessageSearchingResponse.builder()
                    .zaloStatus(ZaloStatus.PARAMETER_VALUE_IS_INVALID)
                    .build();
        }

        Set<MessageResponse> messageResponses = getMessageResponses(pageable, request);

        return MessageSearchingResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .data(messageResponses)
                .build();
    }

    @Override
    public GlobalSearchingResponse searchUsersAndMessagesByKeyword(Pageable pageable, SearchingRequest request) {
        log.info("Start global search with request " + request.toString());

        Set<UserResponse> userResponses = getUsersResponse(pageable, request);
        Set<MessageResponse> messageResponses = getMessageResponses(pageable, request);

        return GlobalSearchingResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .data(GlobalSearchingResponse.DataBuilder.builder()
                        .users(userResponses)
                        .messages(messageResponses)
                        .build())
                .build();

    }

    private boolean isNotValidRequest(SearchingRequest request) {
        return request.getKeyword() == null || StringUtils.isEmpty(request.getKeyword());
    }

    private Set<UserResponse> getUsersResponse(Pageable pageable, SearchingRequest request) {
        Set<User> users = new HashSet<>(userPagingAndSortingRepo.searchByKeyword(pageable, request.getKeyword()));
        return users.stream()
                .map(UserResponse::new)
                .collect(Collectors.toSet());
    }

    private Set<MessageResponse> getMessageResponses(Pageable pageable, SearchingRequest request) {
        Set<Message> messages = new HashSet<>(messageSortingAndPagingRepo.searchByKeyword(pageable, request.getKeyword()));
        return messages.stream()
                .map(MessageResponse::new)
                .collect(Collectors.toSet());
    }

}
