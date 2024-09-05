package com.tanay.trading.service;

import com.tanay.trading.model.User;
import com.tanay.trading.model.Withdrawal;

import java.util.List;

public interface WithdrawalService
{
    Withdrawal requestWithdrawal(Long amount, User user);

    Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception;

    List<Withdrawal> getUsersWithdrawalHistory(User user);

    List<Withdrawal> getAllWithdrawalRequest();
}
