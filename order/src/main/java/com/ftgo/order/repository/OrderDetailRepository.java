package com.ftgo.order.repository;

import com.ftgo.order.model.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderDetailRepository  extends JpaRepository<OrderDetail, Long> {

}
