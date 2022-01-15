package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.*;

import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserSearchingResponse extends BaseResponse {

    Set<UserResponse> data;

    @Builder
    public UserSearchingResponse(ZaloStatus zaloStatus, Set<UserResponse> data) {
        super(zaloStatus);
        this.data = data;
    }

}
