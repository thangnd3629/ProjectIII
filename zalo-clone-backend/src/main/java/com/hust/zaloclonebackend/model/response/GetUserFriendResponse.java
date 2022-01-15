package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
public class GetUserFriendResponse extends BaseResponse {

    private DataBuilder data;

    @Builder
    public GetUserFriendResponse(ZaloStatus zaloStatus, DataBuilder data) {
        super(zaloStatus);
        this.data = data;
    }

    public static class DataBuilder {
        public Set<UserBuilder> friends;
        public long total;

        public DataBuilder(Set<User> users) {
            this.friends = users.stream()
                    .map(user -> UserBuilder.builder()
                            .user(user)
                            .build())
                    .collect(Collectors.toSet());
            this.total = friends.size();
        }
    }

    public static class UserBuilder {
        public String userId;
        public String userName;
        public String avatar;
        public String status;

        @Builder
        public UserBuilder(User user) {
            this.userId = user.getUserId();
            this.userName = user.getName();
            this.avatar = user.getAvatarLink();
            this.status = user.getStatus();
        }
    }

}
