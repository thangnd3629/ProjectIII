package com.hust.zaloclonebackend.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class ModelUserRegister {
    @NotBlank(message = "Được yêu cầu")
    @Size(max = 15, min = 7, message = "Độ dài từ 7 đến 15")
    String phoneNumber;

    @NotBlank(message = "Được yêu cầu")
    @Size(min = 6, message = "Độ dài vượt từ 9 đến 12")
    String password;

    @NotBlank(message = "Được yêu cầu")
    @Size(min = 5, max = 100, message = "Độ dài từ 10 đến 100")

    String name;
}
