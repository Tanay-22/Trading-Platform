package com.tanay.trading.service;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import com.tanay.trading.domain.PaymentMethod;
import com.tanay.trading.domain.PaymentOrderStatus;
import com.tanay.trading.model.PaymentOrder;
import com.tanay.trading.model.User;
import com.tanay.trading.repository.PaymentOrderRepository;
import com.tanay.trading.response.PaymentResponse;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService
{
    @Autowired
    private PaymentOrderRepository paymentOrderRepository;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${razorpay.api.key}")
    private String apiKey;

    @Value("${razorpay.api.secret}")
    private String apiSecretKey;

    @Override
    public PaymentOrder createOrder(User user, Long amount, PaymentMethod paymentMethod)
    {
        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setUser(user);
        paymentOrder.setAmount(amount);
        paymentOrder.setPaymentMethod(paymentMethod);
        paymentOrder.setStatus(PaymentOrderStatus.PENDING);

        return paymentOrderRepository.save(paymentOrder);
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) throws Exception
    {
        return paymentOrderRepository.findById(id)
                .orElseThrow(() -> new Exception("Payment Order not found"));
    }

    @Override
    public Boolean proceedPayment(PaymentOrder paymentOrder, String paymentId) throws RazorpayException
    {
        if(paymentOrder.getStatus() == null)
        {
            paymentOrder.setStatus(PaymentOrderStatus.PENDING);
        }

        if(paymentOrder.getStatus().equals(PaymentOrderStatus.PENDING))
        {
            if(paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY))
            {
                RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecretKey);
                Payment payment = razorpayClient.payments.fetch(paymentId);

                Integer amount = payment.get("amount");
                String status = payment.get("status");

                if(status.equals("captured"))
                {
                    paymentOrder.setStatus(PaymentOrderStatus.SUCCESS);
                    paymentOrderRepository.save(paymentOrder);
                    return true;
                }
                paymentOrder.setStatus(PaymentOrderStatus.FAILED);
                paymentOrderRepository.save(paymentOrder);
                return false;
            }
        }
        return null;
    }

    @Override
    public PaymentResponse createRazorPaymentLink(User user, Long amount, Long orderId) throws RazorpayException
    {
        Long amtPaisa = amount * 100;

        try
        {
            RazorpayClient razorpay = new RazorpayClient(apiKey, apiSecretKey);

            JSONObject paymentLinkReq = new JSONObject();
            paymentLinkReq.put("amount", amtPaisa);
            paymentLinkReq.put("currency", "INR");

            JSONObject customer = new JSONObject();
            customer.put("name", user.getFullName());
            customer.put("email", user.getEmail());
            paymentLinkReq.put("customer", customer);

            JSONObject notify = new JSONObject();
            notify.put("email", true);
            paymentLinkReq.put("notify", notify);

            paymentLinkReq.put("reminder_enable", true);

            // re-direct to callback if payment is unsuccessful
            paymentLinkReq.put("callback_url", "http://localhost:5173/wallet?order_id=" + orderId);
            paymentLinkReq.put("callback_method", "get");

            PaymentLink payment = razorpay.paymentLink.create(paymentLinkReq);

            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("short_url");

            PaymentResponse res = new PaymentResponse();
            res.setPayment_url(paymentLinkUrl);

            return res;
        }
        catch (RazorpayException e)
        {
            System.out.println("Error creating payment link: " + e.getMessage());
            throw new RazorpayException(e.getMessage());
        }
    }

    @Override
    public PaymentResponse createStripePaymentLink(User user, Long amount, Long orderId) throws StripeException
    {
        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http:localhost:5173/wallet?order_id=" + orderId)
                .setCancelUrl("http:localhost:5173/payment/cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount(amount * 100)    // in cents
                                .setProductData(SessionCreateParams
                                        .LineItem
                                        .PriceData
                                        .ProductData
                                        .builder()
                                        .setName("Top up Wallet")
                                        .build()
                                ).build()
                        ).build()
                ).build();
        Session session = Session.create(params);

        System.out.println("Session -> " + session);

        PaymentResponse res = new PaymentResponse();
        res.setPayment_url(session.getUrl());

        return res;
    }
}
