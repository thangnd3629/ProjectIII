package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.model.response.BaseResponse;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
public class ModelGetConversation extends BaseResponse {
    private List<ModelMessage> messageList;
    Boolean isBlock;

    public ModelGetConversation(int code, String message, List<ModelMessage> messageList, Boolean isBlock) {
        super(code, message);
        this.messageList = messageList;
        this.isBlock = isBlock;

    }


    public static ModelGetConversation.Builder builder(){
        return new ModelGetConversation.Builder();
    }
    public static class Builder{
        private int code;
        private String message;
        private List<ModelMessage> messageList;
        private Boolean isBlock;
        public Builder(){

        }
        public ModelGetConversation build()
        {
            return new ModelGetConversation(code, message, messageList, isBlock);
        }

        public Builder code(int code){
            this.code = code;
            return this;
        }
        public Builder messageList(List<ModelMessage> messageList){
            this.messageList = messageList;
            return this;
        }
        public Builder message(String message){
            this.message = message;
            return this;
        }
        public Builder isBlock(Boolean isBlock){
            this.isBlock = isBlock;
            return this;
        }




    }
}
