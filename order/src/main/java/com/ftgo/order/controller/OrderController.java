package com.ftgo.order.controller;

import com.ftgo.order.dto.request.CreateOrderDTO;
import com.ftgo.order.dto.response.BaseResponse;
import com.ftgo.order.model.Order;
import com.ftgo.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/order/get")
    public String getOrder() {
        return "order/order";
    }

    @PostMapping("/order/create")
    public BaseResponse<Order> createOrder(@RequestBody CreateOrderDTO dto) {
        return this.orderService.createOrder(dto);
    }

}
