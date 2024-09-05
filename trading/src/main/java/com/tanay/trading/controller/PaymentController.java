package com.tanay.trading.controller;

import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.domain.PaymentMethod;
import com.tanay.trading.model.PaymentOrder;
import com.tanay.trading.model.User;
import com.tanay.trading.response.PaymentResponse;
import com.tanay.trading.service.PaymentService;
import com.tanay.trading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment")
public class PaymentController
{
    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;


    @PostMapping("/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(@PathVariable PaymentMethod paymentMethod,
                                                          @PathVariable Long amount,
                                                          @RequestHeader(JwtConstant.JWT_HEADER) String jwt)
            throws Exception, RazorpayException, StripeException
    {
        User user = userService.findUserByJwt(jwt);

        PaymentResponse paymentResponse;

        PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);

        if(paymentMethod.equals(PaymentMethod.RAZORPAY))
        {
            paymentResponse = paymentService.createRazorPaymentLink(user, amount);
        }
        else
        {
            paymentResponse = paymentService.createStripePaymentLink(user, amount, order.getId());
        }
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }
}
