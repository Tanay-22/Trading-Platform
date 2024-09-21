package com.tanay.trading.repository;

import com.tanay.trading.model.Wallet;
import com.tanay.trading.model.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long>
{
    List<WalletTransaction> findWalletTransactionsByWallet(Wallet wallet);
}
