package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserPagingAndSortingRepo extends PagingAndSortingRepository<User, String> {

    String SEARCH_BY_KEYWORD_CONDITION = "WHERE (LOWER(u.name) LIKE %:keyword% OR LOWER(u.phoneNumber) LIKE %:keyword%) " +
            "AND u.isDeleted = false";

    @Query(value = "SELECT u FROM User u " + SEARCH_BY_KEYWORD_CONDITION,
    countQuery = "SELECT count (u) FROM User u " + SEARCH_BY_KEYWORD_CONDITION)
    List<User> searchByKeyword(Pageable pageable, @Param("keyword") String keyword);

}
