package com.ftgo.order.service;

import com.ftgo.order.dto.request.CreateOrderDTO;
import com.ftgo.order.dto.response.BaseResponse;
import com.ftgo.order.dto.response.EAPIStatus;
import com.ftgo.order.model.Order;
import com.ftgo.order.model.OrderDetail;
import com.ftgo.order.repository.OrderDetailRepository;
import com.ftgo.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;

    public BaseResponse<Order> createOrder(CreateOrderDTO dto) {
        //        TO-DO: handle check inventory when inventory is complete
        //        TO-DO: handle payment
        Order order = Order.builder()
                .deliveryFee(dto.getDeliveryFee())
                .shippingAddress(dto.getShippingAddress())
                .orderStatus(dto.getOrderStatus())
                .deliveryMethod(dto.getDeliveryMethod())
                .paymentStatus(dto.getPaymentStatus())
                .userId(dto.getUserId())
                .totalPrice(dto.getTotalPrice())
                .build();

        System.out.println(order.getShippingAddress().getAddressLine1());
        orderRepository.save(order);

        Set<OrderDetail> orderDetails = order.getOrderDetails();
        orderDetailRepository.saveAll(orderDetails);

        return new BaseResponse<Order>(EAPIStatus.CREATED, order, "Create order successfully",  1, null);
    }
}
