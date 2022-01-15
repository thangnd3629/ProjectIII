package com.hust.zaloclonebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelMessageConservation {
    private ModelMessage conversation;
    private int isBlocked;
}
