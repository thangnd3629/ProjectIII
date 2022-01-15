package com.hust.zaloclonebackend.entity;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import javax.persistence.*;


import lombok.*;
import org.hibernate.annotations.GenericGenerator;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "uuid2"
    )
    String postId;

    @ManyToOne
    User poster;

    String content;

    String media;

    Date createdDate;

    Date modifiedDate;

    @OneToMany(mappedBy = "post")
    List<Comment> comments;

    @ManyToMany
    List<User> likers;

    @OneToMany(mappedBy = "post")
    List<Image> images;

    private String url;
    @PrePersist
    protected void onCreate(){
        if(!Optional.ofNullable(createdDate).isPresent()){
            createdDate = new Date();
        }

    }
}
