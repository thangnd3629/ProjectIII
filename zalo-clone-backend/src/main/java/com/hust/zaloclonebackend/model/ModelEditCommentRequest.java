package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ModelEditCommentRequest {
    private String comment;
}
