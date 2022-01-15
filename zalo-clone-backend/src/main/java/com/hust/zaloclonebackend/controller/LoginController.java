package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.entity.Conversation;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.ModelLoginResponse;
import com.hust.zaloclonebackend.repo.ConversationRepo;
import com.hust.zaloclonebackend.repo.TestRepo;
import com.hust.zaloclonebackend.repo.UserRepo;
import com.hust.zaloclonebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
@RestController
@CrossOrigin
public class LoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private TestRepo testRepo;

    @Autowired
    private ConversationRepo conversationRepo;


    @RequestMapping(method = RequestMethod.GET, value = "/login")
    public ResponseEntity<ModelLoginResponse> home(@CurrentSecurityContext(expression = "authentication.name") String name, Principal principal) {

        HttpHeaders headers = new HttpHeaders();
        User user = userService.findByPhoneNumber(principal.getName());
        ModelLoginResponse modelLoginResponse = ModelLoginResponse.builder().userName(name)
                                                                            .phoneNumber(user.getPhoneNumber())
                                                                                    .avatar(user.getAvatarLink())
                                                                                            .id(user.getUserId())
                                                                                                    .build();

        headers.set("Access-Control-Expose-Headers", "X-Auth-Token");
        return ResponseEntity.ok().headers(headers).body(modelLoginResponse);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/hello")
    public String sayHello() {
        return "Swagger Hello World";
    }

    @RequestMapping(method = RequestMethod.GET, value = "/test")
    public ResponseEntity test(Principal principal){


        return ResponseEntity.status(200).body(ZaloStatus.CODE_VERIFY_IS_INCORRECT);
    }
}
