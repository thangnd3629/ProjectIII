package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetUserStateResponse extends BaseResponse {

    private String data;

    @Builder
    public SetUserStateResponse(ZaloStatus zaloStatus, String data) {
        super(zaloStatus);
        this.data = data;
    }

}
