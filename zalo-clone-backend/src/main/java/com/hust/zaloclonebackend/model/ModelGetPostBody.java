package com.hust.zaloclonebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelGetPostBody {
    private String id;
    private String described;
    private Date createAt;
    private int like;
    private int comment;
    int is_Like;
    private List<String> image;
    private ModelAuthor author;
}
