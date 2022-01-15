package com.hust.zaloclonebackend.repo.impl;

import com.hust.zaloclonebackend.dto.FriendDTO;
import com.hust.zaloclonebackend.repo.FriendRepo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;

@Repository
public class FriendRepoImpl implements FriendRepo {

    NamedParameterJdbcTemplate jdbcTemplate;

    @Override
    public List<FriendDTO> getFriendSuggest(String userId) {
        String sql = "select user.user_id as id, user.avatar_link as ava, user.name, user.password as j, " +
                "user.phone_number as phone, user.is_deleted as del, user.status from " +
                "(select " +
                "count(*) as numlikecount, likers_user_id from posts_likers, posts " +
                "where posts_likers.post_post_id = posts.post_id " +
                "and posts.poster_user_id = (:userId) "  +
                "group by likers_user_id " +
                "order by numlikecount desc limit 10 " + // TODO: hard code
                ") as A " +
                "inner join user on A.likers_user_id = user.user_id ";

        HashMap<String, Object> param = new HashMap<>();
        param.put("userId", userId);

        return jdbcTemplate.query(sql, param, (rs, rowNum) -> FriendDTO.builder()
                .id(rs.getString(1))
                .avatarLink(rs.getString(2))
                .name(rs.getString(3))
                .password(rs.getString(4))
                .phoneNumber(rs.getString(5))
                .isDeleted(rs.getBoolean(6))
                .status(rs.getString(7)).build());
    }
}
