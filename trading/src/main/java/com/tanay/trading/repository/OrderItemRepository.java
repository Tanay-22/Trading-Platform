package com.tanay.trading.repository;

import com.tanay.trading.model.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long>
{
}
