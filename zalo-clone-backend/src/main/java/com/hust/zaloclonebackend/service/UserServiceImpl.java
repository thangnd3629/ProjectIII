package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.entity.Relationship;
import com.hust.zaloclonebackend.entity.Role;
import com.hust.zaloclonebackend.entity.RoleEnum;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.exception.ZaloStatus;
import com.hust.zaloclonebackend.model.response.GetUserFriendResponse;
import com.hust.zaloclonebackend.model.ModelUserRegister;
import com.hust.zaloclonebackend.model.ModelUserRegisterResponse;
import com.hust.zaloclonebackend.repo.RelationshipPagingAndSortingRepo;
import com.hust.zaloclonebackend.repo.UserRepo;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import org.springframework.util.CollectionUtils;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
@Slf4j
public class UserServiceImpl implements UserService {

    UserRepo userRepo;

    RelationshipPagingAndSortingRepo relationshipPagingAndSortingRepo;

    @Override
    public User findById(String id) {
        return userRepo.findUserByUserId(id);
    }

    @Override
    public User findByPhoneNumber(String phoneNumber) {
        return userRepo.findUserByPhoneNumber(phoneNumber);
    }

    @Override
    public User save(User user) {
        return userRepo.save(user);
    }

    @Override
    public User findByUsername(String name) {
        return userRepo.findUserByName(name);
    }

    @Override
    public ModelUserRegisterResponse register(ModelUserRegister modelUserRegister) throws Exception {
        log.info("register");
        User exist = userRepo.findUserByPhoneNumber(modelUserRegister.getPhoneNumber());
        log.info("exist {}", exist);
        if(Optional.ofNullable(exist).isPresent()){
            return ModelUserRegisterResponse.builder()
                    .code(ZaloStatus.USER_EXISTED.getCode())
                    .message(ZaloStatus.USER_EXISTED.getMessage())
//                    .user(null)
                    .build();
        }

        if(!validateModelUserRegister(modelUserRegister)){
            return ModelUserRegisterResponse.builder()
                    .code(ZaloStatus.PARAMETER_VALUE_IS_INVALID.getCode())
//                    .user(null)
                    .message(ZaloStatus.PARAMETER_VALUE_IS_INVALID.getMessage())
                    .build();
        }

        User user = User.builder()
                .phoneNumber(modelUserRegister.getPhoneNumber())
                .password(User.PASSWORD_ENCODER.encode(modelUserRegister.getPassword()))
                .name(modelUserRegister.getName())
                .build();
        userRepo.save(user);
        return ModelUserRegisterResponse.builder()
                .code(ZaloStatus.OK.getCode())
                .message(ZaloStatus.OK.getMessage())
                .build();
    }

    @Override
    public GetUserFriendResponse getUserFriends(String phoneNumber, Pageable pageable) {
        log.info("Start get user friend service with phoneNumber " + phoneNumber +
                " page number " + pageable.getPageNumber() +
                " page size " + pageable.getPageSize());
        GetUserFriendResponse errorResponse = GetUserFriendResponse.builder()
                .zaloStatus(ZaloStatus.PARAMETER_VALUE_IS_INVALID)
                .data(null)
                .build();

        if (phoneNumber == null) {
            return errorResponse;
        }

        User user = userRepo.findUserByPhoneNumber(phoneNumber);
        if (user == null) {
            log.info("Not found user with phoneNumber " + phoneNumber);
            return errorResponse;
        }

        List<Relationship> relationships = user.getFriends();
        if (CollectionUtils.isEmpty(relationships)) {
            log.info("Relationships is empty");
            return GetUserFriendResponse.builder()
                    .zaloStatus(ZaloStatus.NO_DATA)
                    .data(null)
                    .build();
        }

        Set<User> friends = relationships.stream()
                .map(Relationship::getUserB)
                .filter(aUser -> !aUser.isDeleted())
                .skip((long) pageable.getPageNumber() * pageable.getPageSize())
                .limit(pageable.getPageSize())
                .collect(Collectors.toSet());

        if (CollectionUtils.isEmpty(friends)) {
            return GetUserFriendResponse.builder()
                    .zaloStatus(ZaloStatus.NO_DATA)
                    .data(null)
                    .build();
        }

        return GetUserFriendResponse.builder()
                .zaloStatus(ZaloStatus.OK)
                .data(new GetUserFriendResponse.DataBuilder(friends))
                .build();
    }

    @Override
    public boolean hasAdminRole(User user) {
        if (user == null) {
            return false;
        }

        List<Role> adminRole = user.getRoles().stream()
                .filter(c -> c.getName() == RoleEnum.SYSTEM_ADMIN)
                .collect(Collectors.toList());
        return !CollectionUtils.isEmpty(adminRole);
    }

    private boolean validateModelUserRegister(ModelUserRegister modelUserRegister){
        return true;
    }


}
