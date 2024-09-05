package com.tanay.trading.service;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.tanay.trading.domain.PaymentMethod;
import com.tanay.trading.model.PaymentOrder;
import com.tanay.trading.model.User;
import com.tanay.trading.response.PaymentResponse;

public interface PaymentService
{
    PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod);

    PaymentOrder getPaymentOrderById(Long id) throws Exception;

    Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId) throws RazorpayException;

    PaymentResponse createRazorPaymentLink(User user, Long amount) throws RazorpayException;

    PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException;

}
