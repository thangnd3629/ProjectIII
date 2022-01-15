package com.hust.zaloclonebackend.model.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SetUserStateRequest {

    String userId;
    String state;

}
