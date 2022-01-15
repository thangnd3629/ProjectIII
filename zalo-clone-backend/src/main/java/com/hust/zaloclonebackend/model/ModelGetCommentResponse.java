package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

import java.util.Date;

@Data
@Builder
public class ModelGetCommentResponse {
    private Long id;
    private String comment;
    private Date createAt;
    private ModelCommenterResponse commenter;
}
