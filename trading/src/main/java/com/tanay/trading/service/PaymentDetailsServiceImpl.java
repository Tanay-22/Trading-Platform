package com.tanay.trading.service;

import com.tanay.trading.model.PaymentDetails;
import com.tanay.trading.model.User;
import com.tanay.trading.repository.PaymentDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentDetailsServiceImpl implements PaymentDetailsService
{
    @Autowired
    private PaymentDetailRepository paymentDetailRepository;


    @Override
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName, User user)
    {
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setAccountNumber(accountNumber);
        paymentDetails.setAccountHolderName(accountHolderName);
        paymentDetails.setBankName(bankName);
        paymentDetails.setIfsc(ifsc);
        paymentDetails.setUser(user);

        return paymentDetailRepository.save(paymentDetails);
    }

    @Override
    public PaymentDetails getUsersPaymentDetails(User user)
    {
        return paymentDetailRepository.findByUserId(user.getId());
    }
}
