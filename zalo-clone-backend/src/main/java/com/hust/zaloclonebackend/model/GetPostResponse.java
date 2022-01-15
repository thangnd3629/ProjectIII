package com.hust.zaloclonebackend.model;

import java.util.HashMap;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GetPostResponse {
    private HashMap<String,String> data;
    private HashMap<String,String> author;
    private boolean can_edit;
    private boolean is_blocked;
}
