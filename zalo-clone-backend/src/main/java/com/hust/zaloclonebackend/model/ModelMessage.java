package com.hust.zaloclonebackend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ModelMessage {
    private String message;
    private String message_id;
    private int unread;
    private Date created;
    private ModelAuthor sender;

}
