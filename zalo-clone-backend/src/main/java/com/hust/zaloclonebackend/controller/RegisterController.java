package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.ModelUserRegister;
import com.hust.zaloclonebackend.model.ModelUserRegisterResponse;
import com.hust.zaloclonebackend.repo.UserRepo;
import com.hust.zaloclonebackend.service.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@CrossOrigin
@Slf4j
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class RegisterController {
    UserService userService;
    @PostMapping("/user/register")
    public ResponseEntity<?> register(@RequestBody @Valid ModelUserRegister modelUserRegister) throws Exception {
        log.info("modelUserRegister {}", modelUserRegister);
        ModelUserRegisterResponse modelUserRegisterResponse = userService.register(modelUserRegister);
        log.info("modelUserRegisterResponse {}", modelUserRegisterResponse);
        return ResponseEntity.status(HttpStatus.OK).body(modelUserRegisterResponse);
    }
}
