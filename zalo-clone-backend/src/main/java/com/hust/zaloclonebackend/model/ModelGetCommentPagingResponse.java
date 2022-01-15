package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ModelGetCommentPagingResponse {
    private int code;
    private String message;
    private List<ModelGetCommentResponse> data;
}
