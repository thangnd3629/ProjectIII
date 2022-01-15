package com.hust.zaloclonebackend.exception;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonValue;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ZaloStatus {
    OK(1000,""),
    POST_NOT_EXISTED(9992, "Post is not exist"),
    CODE_VERIFY_IS_INCORRECT(9993, "Code verify is incorrect"),
    NO_DATA(9994, "No Data or end of list data"),
    USER_NOT_VALIDATE(9995, "User is not validate"),
    USER_EXISTED(9996, "User Existed"),
    METHOD_IS_INVALID(9997, "Method is invalid"),
    TOKEN_INVALID(9998, "Token is invalid"),
    EXCEPTION_ERROR(9999, "Exception error"),
    DB_CONNECTION(1001, "Can not connect to DB"),
    PARAMETER_IS_NOT_ENOUGH(1002, "Parameter is not enough"),
    PARAMETER_TYPE_IS_INVALID(1003, "Parameter type is invalid"),
    PARAMETER_VALUE_IS_INVALID(1004, "Parameter value is invalid"),
    UNKNOWN_ERROR(1005, "Unknown error"),
    FILE_SIZE_IS_TOO_BIG(1006, "File size is too big"),
    UPLOAD_FILE_FAILED(1007, "Upload file failed!"),
    MAXIMUM_NUMBER_OF_IMAGE(1008,"Maximum number of images"),
    NOT_ACCESS(1009, "Not access"),
    ACTION_HAS_BEEN_DONE(1010, "Action has been done previously by this user");


    private final int code;
    private final String message;

    ZaloStatus(int code, String message) {
        this.code = code;
        this.message = message;
    }

//    @JsonValue
    public int getCode() {
        return code;
    }

//    @JsonValue
    public String getMessage() {
        return message;
    }

    public static ZaloStatus findByCode(int code) {
        for (ZaloStatus status : ZaloStatus.values()) {
            if (status.getCode() == code) {
                return status;
            }
        }
        return null;
    }

}
