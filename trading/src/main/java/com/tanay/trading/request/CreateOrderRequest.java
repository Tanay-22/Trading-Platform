package com.tanay.trading.request;

import com.tanay.trading.domain.OrderType;
import lombok.Data;

@Data
public class CreateOrderRequest
{
    private String coinId;
    private double quantity;
    private OrderType orderType;
}
