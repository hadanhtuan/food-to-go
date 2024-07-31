package com.ftgo.order.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ftgo.order.dto.response.BaseResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.ContentCachingResponseWrapper;

public class HTTPRequestInterceptor implements HandlerInterceptor {
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object o, ModelAndView modelAndView) {
        try {
            ContentCachingResponseWrapper responseWrapper = new ContentCachingResponseWrapper(response);

            String responseBody = new String(responseWrapper.getContentAsByteArray(), responseWrapper.getCharacterEncoding());


            ObjectMapper objectMapper = new ObjectMapper();
            BaseResponse baseResponse = objectMapper.readValue(responseBody, BaseResponse.class);
            System.out.println(baseResponse.getStatus());

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
