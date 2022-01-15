package com.hust.zaloclonebackend.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ModelAuthor {
    private String id;
    private String name;
    private String avartar;
}
