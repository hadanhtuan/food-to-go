package com.ftgo.order.model;

import com.ftgo.order.model.enumeration.EOrderStatus;
import jakarta.persistence.*;
import lombok.*;

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
    private ShippingAddress shippingAddressId;

    @Column(name = "user_id")
    private String userId;

    @Enumerated(EnumType.STRING)
    @Column(name = "order_status")
    private EOrderStatus orderStatus;

    @Column(name = "address_id")
    private String addressId;

    @Column(name = "test")
    private String test;

    @Column(name = "email_address", nullable = false)
    private String email;

    @Column(name = "phone_number")
    private int phoneNumber;
}
