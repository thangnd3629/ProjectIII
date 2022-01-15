package com.hust.zaloclonebackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
public class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "uuid2"
    )
    private String userId;

//    @Column(name = "name")
//    @NotNull
    private String name;

//    @Column(name = "password")
//    @NotNull
    @JsonIgnore
    private String password;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;
    
    //Duc anh
    String avatarLink;

    private String status;

    private boolean isDeleted = false;

    @OneToMany(mappedBy = "poster", fetch = FetchType.LAZY) // User possess many Posts
    List<Post> post;
    
    // List of relationship of user B adding this user as a friend, there'll be a better solution for this but idk
    @OneToMany(mappedBy = "userA")
    List<Relationship> friends;

    @OneToMany(mappedBy = "userB")
    List<Relationship> beFriendWith;





    @ManyToMany(mappedBy = "users")
    private List<Conversation> conversations;



    @OneToMany(mappedBy = "user")
    List<Block> blockedUsers;


    @OneToMany(mappedBy = "blockedUser")
    List<Block> blockedByUsers;

    @OneToMany(mappedBy = "commentOwner")
    List<Comment> comments;

    @ManyToMany
    List<Post> likedPosts;

    @ManyToMany(cascade = CascadeType.REMOVE)
    List<Role> roles;

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    public static final String SYSTEM_ADMIN = "SYSTEM_ADMIN";

    public ArrayList<User> getBlockList()
    {
        ArrayList<User> result = new ArrayList<>();
        for (Block block : this.blockedUsers) {
            result.add(block.getBlockedUser()); 
        }

        return result;
    }
}
