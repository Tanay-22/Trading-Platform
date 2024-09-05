package com.tanay.trading.controller;

import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.model.*;
import com.tanay.trading.response.PaymentResponse;
import com.tanay.trading.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/wallet")
public class WalletController
{
    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private PaymentService paymentService;


    @GetMapping
    public ResponseEntity<Wallet> getUserWallet(@RequestHeader(JwtConstant.JWT_HEADER) String jwt) throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        Wallet wallet = walletService.getUserWallet(user);

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }


    @PutMapping("/{walletId}/transfer")
    public ResponseEntity<Wallet> walletToWalletTransfer(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                                         @PathVariable Long walletId,
                                                         @RequestBody WalletTransaction req)
            throws Exception
    {
        User senderUser = userService.findUserByJwt(jwt);
        Wallet receiverWallet = walletService.findByWalletById(walletId);
        Wallet wallet = walletService.walletToWalletTransfer(senderUser, receiverWallet, req.getAmount());

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }


    @PutMapping("/order/{orderId}/pay")
    public ResponseEntity<Wallet> payOrderPayment(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                                  @PathVariable Long orderId)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        Order order = orderService.getOrderById(orderId);

        Wallet wallet = walletService.payOrderPayment(order, user);

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }


    @PutMapping("/deposit")
    public ResponseEntity<Wallet> addBalanceToWallet(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                                     @RequestParam("order_id") Long orderId,
                                                     @RequestParam("payment_id") String paymentId)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        Wallet wallet = walletService.getUserWallet(user);

        PaymentOrder order = paymentService.getPaymentOrderById(orderId);

        Boolean status = paymentService.proceedPayment(order, paymentId);

        if(status)
            wallet = walletService.addBalance(wallet, order.getAmount());

        return new ResponseEntity<>(wallet, HttpStatus.ACCEPTED);
    }
}
