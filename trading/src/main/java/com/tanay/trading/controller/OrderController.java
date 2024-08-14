package com.tanay.trading.controller;

import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.domain.OrderStatus;
import com.tanay.trading.domain.OrderType;
import com.tanay.trading.model.Coin;
import com.tanay.trading.model.Order;
import com.tanay.trading.model.User;
import com.tanay.trading.request.CreateOrderRequest;
import com.tanay.trading.service.CoinService;
import com.tanay.trading.service.OrderService;
import com.tanay.trading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController
{
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @Autowired
    private CoinService coinService;

    @PostMapping("/pay")
    public ResponseEntity<Order> payOrderPayment(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                                 @RequestBody CreateOrderRequest req) throws Exception
    {
        User user  = userService.findUserByJwt(jwt);
        Coin coin = coinService.findById(req.getCoinId());

        Order order = orderService.processOrder(coin, req.getQuantity(), req.getOrderType(), user);

        return ResponseEntity.ok(order);
    }


    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                              @PathVariable Long orderId)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        Order order = orderService.getOrderById(orderId);
        if(order.getUser().getId().equals(user.getId()))
            return ResponseEntity.ok(order);
        else
            throw new Exception("You don't have access");
    }


    @GetMapping
    public ResponseEntity<List<Order>> getAllOrdersForUser(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                                           @RequestParam(required = false) OrderType order_type,
                                                           @RequestParam(required = false) String asset_symbol)
            throws Exception
    {
        Long userId = userService.findUserByJwt(jwt).getId();

        List<Order> orders = orderService.getAllOrdersOfUser(userId, order_type, asset_symbol);

        return ResponseEntity.ok(orders);
    }
}
