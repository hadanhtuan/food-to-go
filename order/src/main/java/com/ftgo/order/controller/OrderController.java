package com.ftgo.order.controller;

import com.ftgo.order.service.OrderService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/order/get")
    public String getOrder() {
        return "order/order";
    }

    @PostMapping("/order/create")
    public String createOrder() {
        return "order/order";
    }
}
