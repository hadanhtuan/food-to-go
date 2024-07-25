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
    public Long addressId;

    @Column(name = "is_active")
    public Boolean isActive;
}
