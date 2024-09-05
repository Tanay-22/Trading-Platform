package com.tanay.trading.service;

import com.tanay.trading.model.PaymentDetails;
import com.tanay.trading.model.User;

public interface PaymentDetailsService
{
    PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName,
                                     User user);

    PaymentDetails getUsersPaymentDetails(User user);
}
