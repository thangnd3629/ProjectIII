package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.repo.UserRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor(onConstructor = @__(@Autowired))
public class UserDetailService implements UserDetailsService {

    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String phoneNumber) throws UsernameNotFoundException {
        com.hust.zaloclonebackend.entity.User user = userService.findByPhoneNumber(phoneNumber);
        String[] roles = {"ADMIN"};
        if (user != null) {
            return new User(user.getPhoneNumber(), user.getPassword(), AuthorityUtils.createAuthorityList(roles));
        } else {
            throw new UsernameNotFoundException("Username Not Found");
        }
    }
}
