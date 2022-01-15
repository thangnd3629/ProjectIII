package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.dto.InputTransportDTO;
import com.hust.zaloclonebackend.entity.Conversation;
import com.hust.zaloclonebackend.entity.ConversationType;
import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.model.*;
import com.hust.zaloclonebackend.repo.ConversationRepo;
import com.hust.zaloclonebackend.repo.MessageRepo;
import com.hust.zaloclonebackend.repo.MessageSortingAndPagingRepo;
import com.hust.zaloclonebackend.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.*;


@Component
@Slf4j
public class ChatServiceImpl implements ChatService {
    private final MessageRepo messageRepo;

    private final UserRepo userRepo;

    private final MessageSortingAndPagingRepo messageSortingAndPagingRepo;

    private final ConversationRepo conversationRepo;

    public ChatServiceImpl(MessageRepo messageRepo, UserRepo userRepo, MessageSortingAndPagingRepo messageSortingAndPagingRepo, ConversationRepo conversationRepo) {
        this.messageRepo = messageRepo;
        this.userRepo = userRepo;
        this.messageSortingAndPagingRepo = messageSortingAndPagingRepo;
        this.conversationRepo = conversationRepo;
    }


    @Override
    public Conversation initializePrivateConversation(List<User> users) {
        assert users.size() == 2;
        Conversation conversation = Conversation.builder().conversationType(ConversationType.PRIVATE_CHAT).users(users).build();
        conversationRepo.save(conversation);
        return conversation;
    }


    @Override
    public ModelSendPrivateMessage sendPrivateMessage(InputTransportDTO dto) {
        User receiver = userRepo.getUserByUserId(dto.getToUser());
        User sender = userRepo.getUserByUserId(dto.getFromUser());
        Conversation existingConv = conversationRepo.getPrivateConversationByMembers(sender, receiver);
        if (existingConv == null) {
            List<User> conversationMember = new ArrayList<>(Arrays.asList(sender, receiver));
            existingConv = initializePrivateConversation(conversationMember);
        }
        Message message = Message.builder().content(dto.getContent()).conversation(existingConv).sender(sender).seen(1).timestamp(new Date()).build();
        messageRepo.save(message);
        ModelAuthor msgSenderJson = ModelAuthor.builder().id(sender.getUserId()).name(sender.getName()).avartar(sender.getAvatarLink()).build();
        return ModelSendPrivateMessage.builder().message(dto.getContent()).conversationId(existingConv.getId()).message_id(message.getMessageId()).created(message.getTimestamp()).unread(1).sender(msgSenderJson).build();

    }

    @Override
    public ModelGetListConversation getListConversation(String name, Pageable pageable) {
        User user = userRepo.findUserByPhoneNumber(name);
        List<Conversation> conversations = conversationRepo.findAllByUser(user);
        List<ModelGetListConversationItem> conversationItems = new ArrayList<>();
        int numNewBox = 0;
        for (Conversation conversation : conversations) {
            User partner = userRepo.findConversationPartner(conversation, user);
            ModelConversationPartner modelConversationPartner = ModelConversationPartner.builder().id(partner.getUserId()).username(partner.getName()).avatar(partner.getAvatarLink()).build();
            //get last message
            Message lastMsg = messageSortingAndPagingRepo.findFirstByConversationOrderByTimestampDesc(conversation);
            if (lastMsg.getSeen() == 1) {
                numNewBox++;
            }
            ModelLastMessage modelLastMessage = ModelLastMessage.builder().message(lastMsg.getContent()).unread(lastMsg.getSeen()).created(lastMsg.getTimestamp()).build();
            ModelGetListConversationItem conversationItem = ModelGetListConversationItem.builder().id(conversation.getId()).partner(modelConversationPartner).lastMessage(modelLastMessage).build();
            conversationItems.add(conversationItem);
        }
        return ModelGetListConversation.builder().data(conversationItems).numNewMessage(numNewBox).code(1000).message("OK").build();

    }

    @Override
    public ModelGetConversation getConversationMessages(String name, Pageable pageable, String conv_id) {
        User user = userRepo.findUserByPhoneNumber(name);
        Conversation conversation = conversationRepo.getConversationById(conv_id);
        if(!conversation.getUsers().contains(user)){
            return null;
        }
        List<Message> messages = messageSortingAndPagingRepo.getMessagesByConversationIdOrderByTimestampDesc(pageable, conv_id);
        List<ModelMessage> modelMessageList = new ArrayList<>();
        for (Message message : messages) {
            User sender_ = message.getSender();
            ModelAuthor sender = ModelAuthor.builder().id(sender_.getUserId()).name(sender_.getName()).avartar(sender_.getAvatarLink()).build();
            ModelMessage modelMessage = ModelMessage.builder().message(message.getContent()).message_id(message.getMessageId()).unread(message.getSeen()).created(message.getTimestamp()).sender(sender).build();
            modelMessageList.add(modelMessage);
        }
        ModelGetConversation modelGetConversation = ModelGetConversation.builder().code(1000).message("OK").messageList(modelMessageList).isBlock(false).build();
        return modelGetConversation;


    }


}
