package com.tanay.trading.request;

import lombok.Data;

@Data
public class PaymentDetailsRequest
{
    private String accountNumber;

    private String accountHolderName;

    private String ifsc;

    private String bankName;
}
