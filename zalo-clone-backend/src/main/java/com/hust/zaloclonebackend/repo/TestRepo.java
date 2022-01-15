package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Post;
import com.hust.zaloclonebackend.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TestRepo extends PagingAndSortingRepository<User, Long> {
    @Query("select liker from User u inner join Post p on p.poster = u  and u.userId = :userId  inner join p.likers liker group by liker order by count (liker)")

    List<User> test(@Param("userId") String userId, Pageable pageable);

}
