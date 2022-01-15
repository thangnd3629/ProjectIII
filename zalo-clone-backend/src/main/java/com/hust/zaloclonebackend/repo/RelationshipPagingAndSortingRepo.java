package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Relationship;
import com.hust.zaloclonebackend.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface RelationshipPagingAndSortingRepo extends PagingAndSortingRepository<Relationship, Long> {

    List<Relationship> findAllByUserA(Pageable pageable, User userA);
    List<Relationship> findAllByUserB(Pageable pageable, User userB);

}
