package com.hust.zaloclonebackend.dto;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class FriendDTO {
    private String id;
    private String avatarLink;
    private String name;
    private String password;
    private String phoneNumber;
    private boolean isDeleted;
    private String status;
}
