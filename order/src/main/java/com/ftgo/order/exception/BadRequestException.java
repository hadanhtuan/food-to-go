package com.ftgo.order.exception;

import com.ftgo.order.utils.MessageUtils;

public class BadRequestException extends RuntimeException {
    private String message;
    public BadRequestException(String errorCode, Object... params) {
        this.message = MessageUtils.getMessage(errorCode, params);
    }
}
