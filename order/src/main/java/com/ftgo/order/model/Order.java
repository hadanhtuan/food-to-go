package com.ftgo.order.model;

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
    public Long id;

    @Column(name = "user_id")
    public String userId;

    @Column(name = "address_id")
    public String addressId;

    @Column(name = "test")
    public String test;

    @Column(name = "email_address", nullable = false)
    public String email;


    @Column(name = "phone_number")
    public int phoneNumber;
}
