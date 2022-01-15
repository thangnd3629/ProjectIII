package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ModelGetFriendRequest {
    private String id;
    private String userName;
    private String avatar;
    private Date created;
}
