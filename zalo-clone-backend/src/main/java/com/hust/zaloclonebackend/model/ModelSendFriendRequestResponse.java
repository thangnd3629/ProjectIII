package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelSendFriendRequestResponse {
    private String message;
    private int code;
    private Long id;
}
