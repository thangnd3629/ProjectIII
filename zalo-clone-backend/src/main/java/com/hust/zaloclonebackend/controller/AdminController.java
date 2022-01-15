package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.model.request.SetUserStateRequest;
import com.hust.zaloclonebackend.model.response.SetUserStateResponse;
import com.hust.zaloclonebackend.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@CrossOrigin
@Slf4j
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping(path = "/admin/set-user-state")
    public ResponseEntity<SetUserStateResponse> setUserState(@RequestBody SetUserStateRequest request, Principal principal) {
        log.info("Start set user state controller");
        return ResponseEntity.ok(adminService.setUserState(principal, request));
    }

}
