package com.tanay.trading.controller;

import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.model.User;
import com.tanay.trading.model.Wallet;
import com.tanay.trading.model.WalletTransaction;
import com.tanay.trading.service.WalletTransactionService;
import com.tanay.trading.service.UserService;
import com.tanay.trading.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/transaction")
public class WalletTransactionController
{
    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private WalletTransactionService transactionService;

    @GetMapping
    public ResponseEntity<List<WalletTransaction>> getUserWallet(@RequestHeader(JwtConstant.JWT_HEADER) String jwt)
        throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        Wallet wallet = walletService.findByWalletById(user.getId());

        List<WalletTransaction> transactionsList = transactionService.getTransactionsByWallet(wallet);

        return new ResponseEntity<>(transactionsList, HttpStatus.ACCEPTED);
    }
}
