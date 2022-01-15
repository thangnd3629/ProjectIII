package com.hust.zaloclonebackend.repo;

import com.hust.zaloclonebackend.entity.Role;
import com.hust.zaloclonebackend.entity.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Long> {

    Role findRoleByName(RoleEnum name);

}
