package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelEditComment {
    private Long commentId;
    private String comment;
}
