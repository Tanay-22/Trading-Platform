package com.tanay.trading.controller;

import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.model.PaymentDetails;
import com.tanay.trading.model.User;
import com.tanay.trading.request.PaymentDetailsRequest;
import com.tanay.trading.service.PaymentDetailsService;
import com.tanay.trading.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payment-details")
public class PaymentDetailsController
{
    @Autowired
    private UserService userService;

    @Autowired
    private PaymentDetailsService paymentDetailsService;


    @PostMapping
    public ResponseEntity<PaymentDetails> addPaymentDetails(@RequestBody PaymentDetailsRequest paymentDetailsRequest,
                                                            @RequestHeader(JwtConstant.JWT_HEADER) String jwt)
        throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        PaymentDetails paymentDetails = paymentDetailsService.addPaymentDetails(
            paymentDetailsRequest.getAccountNumber(),
            paymentDetailsRequest.getAccountHolderName(),
            paymentDetailsRequest.getIfsc(),
            paymentDetailsRequest.getBankName(),
            user
        );
        return new ResponseEntity<>(paymentDetails, HttpStatus.CREATED);
    }


    @GetMapping
    public ResponseEntity<PaymentDetails> getPaymentDetails(@RequestHeader(JwtConstant.JWT_HEADER) String jwt)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        PaymentDetails paymentDetails = paymentDetailsService.getUsersPaymentDetails(user);

        return new ResponseEntity<>(paymentDetails, HttpStatus.OK);
    }
}
