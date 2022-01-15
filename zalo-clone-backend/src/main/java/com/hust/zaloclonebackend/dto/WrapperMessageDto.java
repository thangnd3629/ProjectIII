package com.hust.zaloclonebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WrapperMessageDto {
    private boolean isLastMessage;

    private List<MessageDto> messages;
}
