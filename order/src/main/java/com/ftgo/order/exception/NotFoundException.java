package com.ftgo.order.exception;

public class NotFoundException extends RuntimeException {
    private String message;

    public NotFoundException(String errorCode, Object... var) {
        this.message = String.format(errorCode, var);
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
