package com.hust.zaloclonebackend.controller;

import com.hust.zaloclonebackend.dto.InputTransportDTO;
import com.hust.zaloclonebackend.model.ModelSendPrivateMessage;
import com.hust.zaloclonebackend.service.ChatService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
@Slf4j
public class WebSocketController {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private ChatService chatService;

    @MessageMapping("/message")
    public void chattingChannel(InputTransportDTO dto, @Header("simpSessionId") String sessionId) {

        ModelSendPrivateMessage msgJson = chatService.sendPrivateMessage(dto);
        this.messagingTemplate.convertAndSend("/topic/user/"+dto.getToUser(), msgJson);

    }
}
