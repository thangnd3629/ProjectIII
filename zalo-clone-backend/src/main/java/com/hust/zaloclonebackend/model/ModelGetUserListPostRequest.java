package com.hust.zaloclonebackend.model;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelGetUserListPostRequest {
    @Builder.Default
    int lastId = 20;

    @Builder.Default
    int count = 0;
}
