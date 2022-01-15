package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelCommenterResponse {
    private String phoneNumber;
    private String name;
    private String avatar;
}
