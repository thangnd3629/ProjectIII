package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.FriendRequest;
import com.hust.zaloclonebackend.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FriendRequestRepo extends JpaRepository<FriendRequest, Long> {
    @Query("delete from FriendRequest fr where fr.fromUser = :fromUser and fr.toUser = :toUser")
    void deleteFriendRequestByFromUserAndToUserQuery(@Param("fromUser") User fromUser,@Param("toUser") User toUser);

    void deleteByFromUserAndToUser(User fromUser, User toUser);

    FriendRequest findFriendRequestByFromUserAndToUser(User fromUser, User toUser);
}
