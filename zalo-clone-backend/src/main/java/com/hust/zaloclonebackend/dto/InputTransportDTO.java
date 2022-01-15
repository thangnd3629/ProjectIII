package com.hust.zaloclonebackend.dto;


import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class InputTransportDTO {
    private String fromUser;

    private String toUser;

    private String content;


}
