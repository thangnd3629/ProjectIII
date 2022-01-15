package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelAddComment {
    private String postId;
    private String comment;
}
