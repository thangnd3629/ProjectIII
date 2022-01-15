package com.hust.zaloclonebackend.model;

import lombok.Data;

import java.util.List;

@Data
public class ModelEditPostRequest {
    private String id;
    private String describe;
    private List<String> image;
    private List<Long> imageDelId;
}
