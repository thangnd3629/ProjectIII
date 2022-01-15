package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Comment;
import com.hust.zaloclonebackend.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepo extends JpaRepository<Comment, Long> {
    void deleteAllByPost(Post post);

    Comment findCommentByCommentId(Long commentId);
}
