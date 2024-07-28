package com.ftgo.order.service;

import com.ftgo.order.model.Order;
import com.ftgo.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;

    public void createOrder(Order order) {
        //        TO-DO: handle check inventory when inventory is complete
        //        TO-DO: handle payment

    }
}
