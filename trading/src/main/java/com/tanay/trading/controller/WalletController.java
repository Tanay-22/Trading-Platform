package com.tanay.trading.controller;

import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.model.Order;
import com.tanay.trading.model.User;
import com.tanay.trading.model.Wallet;
import com.tanay.trading.model.WalletTransaction;
import com.tanay.trading.service.OrderService;
import com.tanay.trading.service.UserService;
import com.tanay.trading.service.UserServiceImpl;
import com.tanay.trading.service.WalletService;
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
        User senderUser = userService.findUserByJwt(jwt);

        Order order = orderService
    }
}
