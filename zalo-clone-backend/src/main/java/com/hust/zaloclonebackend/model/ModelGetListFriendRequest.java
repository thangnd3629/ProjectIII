package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ModelGetListFriendRequest {
    private String message;
    private int code;
    private List<ModelGetFriendRequest> data;
}
