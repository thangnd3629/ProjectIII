package com.hust.zaloclonebackend.model.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class SearchingRequest {

    private String keyword;
    private String userId;

}
