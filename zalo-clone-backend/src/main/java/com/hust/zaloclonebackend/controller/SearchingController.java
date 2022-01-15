package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.model.request.SearchingRequest;
import com.hust.zaloclonebackend.model.response.GlobalSearchingResponse;
import com.hust.zaloclonebackend.model.response.MessageSearchingResponse;
import com.hust.zaloclonebackend.model.response.UserSearchingResponse;
import com.hust.zaloclonebackend.service.SearchingService;
import io.swagger.models.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@Slf4j
public class SearchingController {

    @Autowired
    SearchingService searchingService;

    @PostMapping(path = "/search-users")
    public ResponseEntity<UserSearchingResponse> searchUsersByKeyword(Pageable pageable,
                                                                     @RequestBody SearchingRequest request) {
        log.info("Start search users by keyword controller");
        UserSearchingResponse userSearchingResponse = searchingService.searchUserByKeyword(pageable, request);
        log.info("userSearchingResponse {}", userSearchingResponse.getData());
        return ResponseEntity.ok(userSearchingResponse);
    }

    @PostMapping(path = "/search-messages")
    public ResponseEntity<MessageSearchingResponse> searchMessagesByKeyword(Pageable pageable,
                                                                            @RequestBody SearchingRequest request) {
        log.info("Start search messages by keyword controller");
        return ResponseEntity.ok(searchingService.searchMessagesByKeyword(pageable, request));
    }

    @PostMapping(path = "/global-search")
    public ResponseEntity<GlobalSearchingResponse> globalSearch(Pageable pageable,
                                                                @RequestBody SearchingRequest request) {
        log.info("Start global search controller");
        return ResponseEntity.ok(searchingService.searchUsersAndMessagesByKeyword(pageable, request));
    }

}
