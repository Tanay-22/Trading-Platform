package com.tanay.trading.model;

import com.tanay.trading.domain.VerificationType;
import lombok.Data;

@Data
public class TwoFactorAuth
{
    private boolean isEnabled = false;
    private VerificationType sendTo;
}
