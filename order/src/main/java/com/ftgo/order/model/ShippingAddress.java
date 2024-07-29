package com.ftgo.order.model;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "shipping_address")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShippingAddress extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @Column(name = "contact_name")
    private String contactName;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address_line1")
    private String addressLine1;

    @Column(name = "address_line2")
    private String addressLine2;

    @Column(name = "city")
    private String city;

    @Column(name = "district_id")
    private Long districtId;

    @Column(name = "district_name")
    private String districtName;

    @Column(name = "state_or_province_id")
    private Long stateOrProvinceId;

    @Column(name = "state_or_province_name")
    private String stateOrProvinceName;

    @Column(name = "country_id")
    private Long countryId;

    @Column(name = "country_name")
    private String countryName;
}



