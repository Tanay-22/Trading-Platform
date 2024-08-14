package com.tanay.trading.service;

import com.tanay.trading.model.Order;
import com.tanay.trading.model.User;
import com.tanay.trading.model.Wallet;

public interface WalletService
{
    Wallet getUserWallet(User user);

    Wallet addBalance(Wallet wallet, Long money);

    Wallet findByWalletById(Long id) throws Exception;

    Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception;

    Wallet payOrderPayment(Order order, User user) throws Exception;
}
