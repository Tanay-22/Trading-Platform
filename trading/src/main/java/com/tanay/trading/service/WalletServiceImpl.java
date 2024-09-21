package com.tanay.trading.service;

import com.tanay.trading.domain.OrderType;
import com.tanay.trading.model.Order;
import com.tanay.trading.model.User;
import com.tanay.trading.model.Wallet;
import com.tanay.trading.model.WalletTransaction;
import com.tanay.trading.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService
{
    @Autowired
    private WalletRepository walletRepository;


    @Override
    public Wallet getUserWallet(User user)
    {
        Wallet wallet = walletRepository.findByUserId(user.getId());

        if(wallet == null)
        {
            wallet = new Wallet();
            wallet.setUser(user);
            walletRepository.save(wallet);
        }
        return wallet;
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long money)
    {
        BigDecimal balance = wallet.getBalance();
        BigDecimal newBalance = balance.add(BigDecimal.valueOf(money));
        wallet.setBalance(newBalance);

        return walletRepository.save(wallet);
    }

    @Override
    public Wallet findByWalletById(Long id) throws Exception
    {
        Optional<Wallet> optionalWallet = walletRepository.findById(id);

        if(optionalWallet.isEmpty())
            throw new Exception("Wallet not found");

        return optionalWallet.get();
    }

    @Override
    public Wallet walletToWalletTransfer(User sender, Wallet receiverWallet, Long amount) throws Exception
    {
        Wallet senderWallet = walletRepository.findByUserId(sender.getId());

        if(senderWallet.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0)
            throw new Exception("Insufficient Balance");

        BigDecimal senderBalance = senderWallet.getBalance()
                .subtract(BigDecimal.valueOf(amount));
        senderWallet.setBalance(senderBalance);
        walletRepository.save(senderWallet);

        BigDecimal receiverBalance = receiverWallet.getBalance()
                .add(BigDecimal.valueOf(amount));
        receiverWallet.setBalance(receiverBalance);
        walletRepository.save(receiverWallet);

        return senderWallet;
    }


    @Override
    public Wallet payOrderPayment(Order order, User user) throws Exception
    {
        Wallet wallet = getUserWallet(user);

        if(order.getOrderType().equals(OrderType.BUY))
        {
            if(wallet.getBalance().compareTo(order.getPrice()) < 0)
                throw new Exception("Insufficient funds for this transaction");

            BigDecimal newBalance = wallet.getBalance().subtract(order.getPrice());
            wallet.setBalance(newBalance);
        }
        else
        {
            BigDecimal newBalance = wallet.getBalance().add(order.getPrice());
            wallet.setBalance(newBalance);
        }
        return walletRepository.save(wallet);
    }
}
