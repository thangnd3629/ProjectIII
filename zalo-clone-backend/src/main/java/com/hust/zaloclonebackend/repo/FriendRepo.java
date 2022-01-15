package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.dto.FriendDTO;

import java.util.List;

public interface FriendRepo {

    List<FriendDTO> getFriendSuggest(String userId);

}
