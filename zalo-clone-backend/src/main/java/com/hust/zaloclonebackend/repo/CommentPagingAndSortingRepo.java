package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Comment;
import com.hust.zaloclonebackend.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

public interface CommentPagingAndSortingRepo extends PagingAndSortingRepository<Comment, Long> {
    Page<Comment> findAllByPost(Post post, Pageable pageable);
}
