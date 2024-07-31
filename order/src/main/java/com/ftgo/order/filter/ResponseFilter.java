package com.ftgo.order.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ftgo.order.dto.response.BaseResponse;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.util.ContentCachingResponseWrapper;
import java.io.IOException;


@Component
@Order(1)
public class ResponseFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        try {

            ContentCachingResponseWrapper responseCacheWrapperObject = new ContentCachingResponseWrapper((HttpServletResponse) servletResponse);
            filterChain.doFilter(servletRequest, responseCacheWrapperObject);

            byte[] responseArray = responseCacheWrapperObject.getContentAsByteArray();
            String responseStr = new String(responseArray, responseCacheWrapperObject.getCharacterEncoding());

            ObjectMapper objectMapper = new ObjectMapper();

            BaseResponse baseResponse = objectMapper.readValue(responseStr, BaseResponse.class);

            ((HttpServletResponse) servletResponse).setStatus(baseResponse.getStatus());

            responseCacheWrapperObject.copyBodyToResponse();
        } catch (Exception e) {
            System.out.println("Exception filter"+e.getMessage());

        }
    }
}
