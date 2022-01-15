package com.hust.zaloclonebackend.util;

import com.hust.zaloclonebackend.entity.Role;
import com.hust.zaloclonebackend.entity.RoleEnum;
import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.repo.RoleRepo;
import com.hust.zaloclonebackend.repo.UserRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.util.List;

@Component
@Slf4j
public class SetUpDataLoader implements ApplicationListener<ContextRefreshedEvent> {

    boolean alreadySetup = false;

    @Autowired
    RoleRepo roleRepo;

    @Autowired
    UserRepo userRepo;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
        log.info("Start set up data....");

        if (alreadySetup) {
            log.info("Data is already set up");
            return;
        }

        Role adminRole = createRoleIfNotFound(RoleEnum.SYSTEM_ADMIN);
        Role userRole = createRoleIfNotFound(RoleEnum.USER);

        if (userRepo.findUserByPhoneNumber("admin") == null) {
            User admin = User.builder()
                    .phoneNumber("admin")
                    .name("admin")
                    .password(User.PASSWORD_ENCODER.encode("admin"))
                    .roles(List.of(adminRole, userRole))
                    .build();
            userRepo.save(admin);
        }

        alreadySetup = true;
        log.info("Set up data success");
    }

    @Transactional
    Role createRoleIfNotFound(RoleEnum name) {
        Role role = roleRepo.findRoleByName(name);

        if (role == null) {
            role = Role.builder()
                    .name(name)
                    .build();
            roleRepo.save(role);
        }

        return role;
    }
}
