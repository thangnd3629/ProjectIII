package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.response.GetUserFriendResponse;
import com.hust.zaloclonebackend.model.ModelUserRegister;
import com.hust.zaloclonebackend.model.ModelUserRegisterResponse;
import org.springframework.data.domain.Pageable;

public interface UserService {
    User findById(String id);

    User findByPhoneNumber(String phoneNumber);

    User save(User user);

    User findByUsername(String name);

    ModelUserRegisterResponse register(ModelUserRegister modelUserRegister) throws Exception;

    GetUserFriendResponse getUserFriends(String phoneNumber, Pageable pageable);

    boolean hasAdminRole(User user);
}
