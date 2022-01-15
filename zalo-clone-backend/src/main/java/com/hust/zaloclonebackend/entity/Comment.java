package com.hust.zaloclonebackend.entity;

import java.util.Date;

import javax.persistence.*;

import lombok.*;

@Data
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long commentId;

    @ManyToOne
    User commentOwner;

    String content;

    Date timestamp;

    @ManyToOne
    Post post;

    @PrePersist
    protected void onCreate()  {
        if(timestamp.equals(null)){
            Date date = new Date();
            timestamp = date;
        }
    }

}
