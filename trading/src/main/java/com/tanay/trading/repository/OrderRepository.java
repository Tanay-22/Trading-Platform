package com.tanay.trading.repository;

import com.tanay.trading.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long>
{
    List<Order> findByUserId(Long userId);


}
