package com.tanay.trading.service;

import com.tanay.trading.model.Wallet;
import com.tanay.trading.model.WalletTransaction;

import java.util.List;

public interface WalletTransactionService
{
    List<WalletTransaction>  getTransactionsByWallet(Wallet wallet);
}
