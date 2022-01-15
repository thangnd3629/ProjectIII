package com.hust.zaloclonebackend.service;

import com.hust.zaloclonebackend.model.request.SetUserStateRequest;
import com.hust.zaloclonebackend.model.response.SetUserStateResponse;

import java.security.Principal;

public interface AdminService {

    SetUserStateResponse setUserState(Principal principal, SetUserStateRequest request);
}
