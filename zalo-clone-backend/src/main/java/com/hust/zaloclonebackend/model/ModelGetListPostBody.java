package com.hust.zaloclonebackend.model;

import com.hust.zaloclonebackend.model.ModelAuthor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelGetListPostBody {
    private List<String> image;
    private ModelAuthor author;
    private String id;
    private String describe;
    private Date createAt;
    private int like;
    private int numComment;
    int isLike;
}
