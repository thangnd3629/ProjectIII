package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.FriendRequest;
import com.hust.zaloclonebackend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface FriendRequestPagingAndSortingRepo extends PagingAndSortingRepository<FriendRequest, Long> {
    List<FriendRequest> findAllByFromUser(Pageable pageable, User fromUser);

    List<FriendRequest> findAllByToUser(Pageable pageable, User toUser);

}
