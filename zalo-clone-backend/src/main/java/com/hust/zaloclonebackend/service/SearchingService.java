package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.model.request.SearchingRequest;
import com.hust.zaloclonebackend.model.response.GlobalSearchingResponse;
import com.hust.zaloclonebackend.model.response.MessageSearchingResponse;
import com.hust.zaloclonebackend.model.response.UserSearchingResponse;
import org.springframework.data.domain.Pageable;


public interface SearchingService {

    UserSearchingResponse searchUserByKeyword(Pageable pageable, SearchingRequest request);

    MessageSearchingResponse searchMessagesByKeyword(Pageable pageable, SearchingRequest request);

    GlobalSearchingResponse searchUsersAndMessagesByKeyword(Pageable pageable, SearchingRequest request);

}
