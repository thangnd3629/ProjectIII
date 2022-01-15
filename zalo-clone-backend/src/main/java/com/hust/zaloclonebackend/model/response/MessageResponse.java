package com.hust.zaloclonebackend.model.response;

import com.hust.zaloclonebackend.entity.Message;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class MessageResponse {

    UserResponse sender;
    String messageId;
    String content;
    Date timestamp;
    String conversationId;

    @Builder
    public MessageResponse(Message message) {
        this.sender = UserResponse.builder().user(message.getSender()).build();
        this.messageId = message.getMessageId();
        this.content = message.getContent();
        this.timestamp = message.getTimestamp();
        this.conversationId = message.getConversation().getId();
    }

}
