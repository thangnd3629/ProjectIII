package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Image;
import com.hust.zaloclonebackend.entity.Post;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepo extends JpaRepository<Image, Long> {
    @Query("select i.value from Image i where i.post = :post")
    List<String> findAllImageValueByPost(@Param(":post") Post post);

    void deleteAllByPost(Post post);

    void deleteById(Long id);
}
