package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.constant.Constant;
import com.hust.zaloclonebackend.dto.InputTransportDTO;
import com.hust.zaloclonebackend.dto.WrapperMessageDto;
import com.hust.zaloclonebackend.entity.Conversation;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.ModelGetConversation;
import com.hust.zaloclonebackend.model.ModelGetListConversation;
import com.hust.zaloclonebackend.model.ModelMessage;
import com.hust.zaloclonebackend.model.ModelSendPrivateMessage;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatService {
    Conversation initializePrivateConversation(List<User> users);
    ModelSendPrivateMessage sendPrivateMessage(InputTransportDTO dto);
    ModelGetListConversation getListConversation(String name, Pageable pageable);
    ModelGetConversation getConversationMessages(String name, Pageable pageable, String conv_id);
}
