package com.hust.zaloclonebackend.dto;

import com.hust.zaloclonebackend.constant.Constant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private Object object;

    private Constant.TransportActionEnum action;

    private String fromUserID;

    private String toUserId;

    private String conservationId;

    private String message;


}
