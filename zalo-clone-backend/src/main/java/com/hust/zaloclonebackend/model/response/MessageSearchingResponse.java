package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Setter
@Getter
public class MessageSearchingResponse extends BaseResponse {

    Set<MessageResponse> data;

    @Builder
    public MessageSearchingResponse(ZaloStatus zaloStatus, Set<MessageResponse> data) {
        super(zaloStatus);
        this.data = data;
    }

}
