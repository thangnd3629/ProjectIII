package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.entity.User;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class UserResponse {

    public String userId;
    public String userName;
    public String avatar;
    public String status;
    public String phoneNumber;

    @Builder
    public UserResponse(User user) {
        this.userId = user.getUserId();
        this.userName = user.getName();
        this.avatar = user.getAvatarLink();
        this.status = user.getStatus();
        this.phoneNumber = user.getPhoneNumber();
    }

}
