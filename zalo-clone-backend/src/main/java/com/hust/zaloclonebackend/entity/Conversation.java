package com.hust.zaloclonebackend.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.List;

@Data
@Slf4j
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Conversation {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "uuid2"
    )
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private ConversationType conversationType;


    @ManyToMany
    @JoinTable(
            name = "conversation_user",
            joinColumns = @JoinColumn(name = "conversation_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")


    )
    private List<User> users;

    @OneToMany(mappedBy = "conversation")
    private List<Message> messages;
}
