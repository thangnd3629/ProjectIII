package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.response.BaseResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;


@Data
public class ModelGetListConversation extends BaseResponse {
    private List<ModelGetListConversationItem> data;
    private int numNewMessage;


    @Builder
    public ModelGetListConversation(int code, String message, List<ModelGetListConversationItem> data, int numNewMessage) {
        super(code, message);
        this.data = data;
        this.numNewMessage = numNewMessage;
    }

}
