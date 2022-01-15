package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelUserRegisterResponse {
//    private ZaloStatus zaloStatus;
//    private User user;
    private int code;
    private String message;
}
