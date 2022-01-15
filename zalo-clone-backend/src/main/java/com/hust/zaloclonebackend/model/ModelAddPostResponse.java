package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelAddPostResponse {
    private int code;
    private String message;
    private String id;
    private String url;
}
