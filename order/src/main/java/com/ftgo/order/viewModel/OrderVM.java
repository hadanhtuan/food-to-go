package com.ftgo.order.viewModel;

import com.ftgo.order.model.Order;
import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record OrderVM(
        Long id,
        String email,
        String note,
        float discount,
        int numberItem,
        BigDecimal totalPrice,
        BigDecimal deliveryFee
) {
    public static OrderVM fromModel(Order order) {
        return OrderVM.builder()
                .id(order.getId())
                .email(order.getEmail()).build();
    }
}
