package com.hust.zaloclonebackend.model;

import java.io.File;
import java.util.HashMap;
import java.util.List;

import com.hust.zaloclonebackend.entity.User;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
public class ModelAddPost {
    List<String> image;
    String describe; 
}
