package com.ftgo.order.dto.request;


import com.ftgo.order.model.OrderDetail;
import com.ftgo.order.model.ShippingAddress;
import com.ftgo.order.model.enumeration.EDeliveryMethod;
import com.ftgo.order.model.enumeration.EOrderStatus;
import com.ftgo.order.model.enumeration.EPaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateOrderDTO {
    private ShippingAddress shippingAddress;

    Set<OrderDetail> orderDetails;

    private String userId;

    private EOrderStatus orderStatus;

    private EDeliveryMethod deliveryMethod;

    private EPaymentStatus paymentStatus;

    private BigDecimal deliveryFee;

    private BigDecimal totalPrice;
}





