package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.model.response.GetUserFriendResponse;
import com.hust.zaloclonebackend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin
@Slf4j
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserController {

    UserService userService;

    @PostMapping(path = "/get_user_friends")
    public ResponseEntity<?> getUserFriends(Principal principal,
                                            Pageable pageable) {
        log.info("Start get user friend with page " + pageable.getPageNumber() + " page size " + pageable.getPageSize());
        String phoneNumber = principal.getName();
        GetUserFriendResponse response = userService.getUserFriends(phoneNumber, pageable);
        return ResponseEntity.ok(response);
    }

}
