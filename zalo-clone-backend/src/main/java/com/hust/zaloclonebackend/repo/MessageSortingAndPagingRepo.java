package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Conversation;
import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;


import java.util.List;

public interface MessageSortingAndPagingRepo extends PagingAndSortingRepository<Message, String> {

    @Query("select m from Message m where m.conversation = :conversation order by m.timestamp desc ")
    Message getLastMessageByConversation(@Param("conv")Conversation conversation);

    Message findFirstByConversationOrderByTimestampDesc(Conversation conversation);

    List<Message> getMessagesByConversationIdOrderByTimestampDesc(Pageable pageable, String convId);

    String SEARCH_BY_KEYWORD_CONDITION = "WHERE LOWER(mess.content) LIKE %:keyword% AND mess.isDeleted = false";
    @Query(value = "SELECT mess FROM Message mess " + SEARCH_BY_KEYWORD_CONDITION,
    countQuery = "SELECT COUNT (mess) FROM Message mess WHERE " + SEARCH_BY_KEYWORD_CONDITION)
    List<Message> searchByKeyword(Pageable pageable, @Param("keyword") String keyword);
}
