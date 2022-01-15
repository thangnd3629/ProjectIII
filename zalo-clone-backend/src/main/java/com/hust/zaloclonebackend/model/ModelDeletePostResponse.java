package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ModelDeletePostResponse {
    private int code;
    private String message;
}
