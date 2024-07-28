package com.ftgo.order.utils;

import org.slf4j.helpers.FormattingTuple;
import org.slf4j.helpers.MessageFormatter;

import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;

public class MessageUtils {
    static ResourceBundle messageBundle = ResourceBundle.getBundle("messages.messages", Locale.getDefault());

    public static String getMessage(String errorCode, Object... params) {
        String message;
        try {
            message = messageBundle.getString(errorCode);
        } catch (MissingResourceException e) {
            message = errorCode;
        }

        FormattingTuple formattingTuple = MessageFormatter.arrayFormat(message, params);
        return formattingTuple.getMessage();
    }
}
