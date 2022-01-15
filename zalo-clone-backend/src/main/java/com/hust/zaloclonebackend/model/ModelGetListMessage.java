package com.hust.zaloclonebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelGetListMessage {
    private String message;
    private int code;
    List<ModelMessageConservation> data;
}
