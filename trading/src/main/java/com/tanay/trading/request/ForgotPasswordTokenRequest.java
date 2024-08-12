package com.tanay.trading.request;

import com.tanay.trading.domain.VerificationType;
import lombok.Data;

@Data
public class ForgotPasswordTokenRequest
{
    private String sendTo;
    private VerificationType verificationType;
}
