package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BaseResponse {

    private int code;
    private String message;

    public BaseResponse(ZaloStatus zaloStatus) {
        this.setCodeAndMessage(zaloStatus);
    }

    public void setCodeAndMessage(ZaloStatus zaloStatus) {
        this.code = zaloStatus.getCode();
        this.message = zaloStatus.getMessage();
    }

}
