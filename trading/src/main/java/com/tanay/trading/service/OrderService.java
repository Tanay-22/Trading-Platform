package com.tanay.trading.service;

import com.tanay.trading.domain.OrderType;
import com.tanay.trading.model.Coin;
import com.tanay.trading.model.Order;
import com.tanay.trading.model.OrderItem;
import com.tanay.trading.model.User;

import java.util.List;

public interface OrderService
{
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}
