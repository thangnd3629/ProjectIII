package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface PostPagingAndSortingRepo extends PagingAndSortingRepository<Post, String> {
    @Query("select post from Post post inner join Relationship r on r.userA = :user and r.userB = post.poster")
    List<Post> getPostNewFeedByUser(Pageable pageable, @Param("user") User user);

    List<Post> findAllByPoster(Pageable pageable, User poster);

}

