package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Message;
import com.hust.zaloclonebackend.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MessageRepo extends JpaRepository<Message, Long> {
//    @Query("select m from Message m group by m.conservationId having m.receiver = :toUser or m.sender = :toUser order by m.timestamp desc ")
//    List<Message> getListMessageWithRelationShip(@Param("toUser") User toUSer);
}
