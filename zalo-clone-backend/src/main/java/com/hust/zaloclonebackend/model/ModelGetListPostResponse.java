package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;

import java.util.List;

@Data
@Builder
public class ModelGetListPostResponse {
    private int code;
    private String message;
    private List<ModelGetListPostBody> data;
}
