package com.ftgo.order.model;

import com.ftgo.order.model.enumeration.EDeliveryMethod;
import com.ftgo.order.model.enumeration.EOrderStatus;
import com.ftgo.order.model.enumeration.EPaymentStatus;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.Set;

@Entity
@Table(name = "order")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "shipping_address_id", referencedColumnName = "id")
    private ShippingAddress shippingAddress;

    @OneToMany(mappedBy = "orderId", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<OrderDetail> orderDetails;

    @Column(name = "user_id")
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private EOrderStatus orderStatus;

    @Enumerated(EnumType.STRING)
    @Column(name="delivery_method")
    private EDeliveryMethod deliveryMethod;

    @Enumerated(EnumType.STRING)
    @Column(name="payment_status")
    private EPaymentStatus paymentStatus;

    @Column(name = "delivery_fee")
    private BigDecimal deliveryFee;

    @Column(name = "total_price")
    private BigDecimal totalPrice;
}
