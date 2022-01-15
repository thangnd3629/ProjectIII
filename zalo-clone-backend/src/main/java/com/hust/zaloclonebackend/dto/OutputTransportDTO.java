package com.hust.zaloclonebackend.dto;

import com.hust.zaloclonebackend.constant.Constant;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OutputTransportDTO {
    private Constant.TransportActionEnum action;

    private Object object;
}
