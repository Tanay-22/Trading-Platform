package com.tanay.trading.service;

import com.tanay.trading.model.Wallet;
import com.tanay.trading.model.WalletTransaction;
import com.tanay.trading.repository.WalletTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WalletTransactionServiceImpl implements WalletTransactionService
{
    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    @Override
    public List<WalletTransaction> getTransactionsByWallet(Wallet wallet)
    {
        return walletTransactionRepository.findWalletTransactionsByWallet(wallet);
    }
}
