package com.tanay.trading.service;

import com.tanay.trading.domain.WithdrawalStatus;
import com.tanay.trading.model.User;
import com.tanay.trading.model.WalletTransaction;
import com.tanay.trading.model.Withdrawal;
import com.tanay.trading.repository.WalletTransactionRepository;
import com.tanay.trading.repository.WithdrawalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WithdrawalServiceImpl implements WithdrawalService
{
    @Autowired
    private WithdrawalRepository withdrawalRepository;


    @Override
    public Withdrawal requestWithdrawal(Long amount, User user)
    {
        Withdrawal withdrawal = new Withdrawal();
        withdrawal.setAmount(amount);
        withdrawal.setUser(user);
        withdrawal.setStatus(WithdrawalStatus.PENDING);

        return withdrawalRepository.save(withdrawal);
    }

    @Override
    public Withdrawal proceedWithdrawal(Long withdrawalId, boolean accept) throws Exception
    {
        Optional<Withdrawal> withdrawalOptional = withdrawalRepository.findById(withdrawalId);
        if(withdrawalOptional.isEmpty())
            throw new Exception("Withdrawal Not Found");

        Withdrawal withdrawal = withdrawalOptional.get();
        withdrawal.setDate(LocalDateTime.now());

        if(accept)
        {
            withdrawal.setStatus(WithdrawalStatus.SUCCESS);
        }
        else
            withdrawal.setStatus(WithdrawalStatus.PENDING);

        return withdrawalRepository.save(withdrawal);
    }

    @Override
    public List<Withdrawal> getUsersWithdrawalHistory(User user)
    {
        return withdrawalRepository.findByUserId(user.getId());
    }

    @Override
    public List<Withdrawal> getAllWithdrawalRequest()
    {
        return withdrawalRepository.findAll();
    }
}
