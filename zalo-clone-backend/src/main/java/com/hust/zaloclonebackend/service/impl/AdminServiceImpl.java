package com.hust.zaloclonebackend.service.impl;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.request.SetUserStateRequest;
import com.hust.zaloclonebackend.model.response.SetUserStateResponse;
import com.hust.zaloclonebackend.repo.UserRepo;
import com.hust.zaloclonebackend.service.AdminService;
import com.hust.zaloclonebackend.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@Slf4j
public class AdminServiceImpl implements AdminService  {

    @Autowired
    UserRepo userRepo;

    @Autowired
    UserService userService;

    @Override
    public SetUserStateResponse setUserState(Principal principal, SetUserStateRequest request) {
        if (request.getUserId() == null || request.getState() == null) {
            return SetUserStateResponse.builder()
                    .zaloStatus(ZaloStatus.PARAMETER_IS_NOT_ENOUGH)
                    .build();
        }

        log.info("Start set user state with user id " + request.getUserId() + " state " + request.getState());
        User requestUser = userRepo.findUserByPhoneNumber(principal.getName());
        User updateUser = userRepo.findUserByUserId(request.getUserId());
        if (requestUser == null || updateUser == null || !userService.hasAdminRole(requestUser)) {
            return SetUserStateResponse.builder()
                    .zaloStatus(ZaloStatus.UNKNOWN_ERROR)
                    .build();
        }

        switch (request.getState()) {
            case "0":
                updateUser.setDeleted(true);
                userRepo.save(updateUser);
                break;
            case "1":
                updateUser.setDeleted(false);
                userRepo.save(updateUser);
                break;
            default:
                return SetUserStateResponse.builder()
                        .zaloStatus(ZaloStatus.PARAMETER_VALUE_IS_INVALID)
                        .build();
        }

        return SetUserStateResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .build();
    }

}
