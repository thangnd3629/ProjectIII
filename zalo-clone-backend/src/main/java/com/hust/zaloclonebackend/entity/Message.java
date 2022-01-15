package com.hust.zaloclonebackend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "messages")
public class Message {


    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "uuid2"
    )
    @Column(name = "id")
    String messageId;

    @ManyToOne
    @JoinColumn(name = "conversation_id")
    private Conversation conversation;


    @OneToOne
    @JoinColumn(name = "sender_id")
    private User sender;

    String content;

    Date timestamp;


    int seen;


    boolean isDeleted = false;
}
