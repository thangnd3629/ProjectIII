package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelStatusResponse {
//    private ZaloStatus zaloStatus;
    private String message;
    private int code;
    private Long id;
}
