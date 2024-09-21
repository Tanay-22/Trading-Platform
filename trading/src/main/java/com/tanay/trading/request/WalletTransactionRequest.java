package com.tanay.trading.request;

import lombok.Data;

@Data
public class WalletTransactionRequest
{
    private String purpose;

    private Long amount;
}
