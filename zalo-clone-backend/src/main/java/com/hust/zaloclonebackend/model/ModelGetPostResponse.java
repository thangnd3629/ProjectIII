package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelGetPostResponse {
    private int code;
    private String message;
    private ModelGetPostBody data;

}
