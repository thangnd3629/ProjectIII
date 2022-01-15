package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Relationship;
import com.hust.zaloclonebackend.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RelationShipRepo extends JpaRepository<Relationship, Long> {
    Relationship findRelationshipByUserAAndUserB(User userA, User userB);

    @Query("select r.userB from Relationship r where r.userA = :user")
    List<User> getFriendByUser(@Param("user") User user);
}
