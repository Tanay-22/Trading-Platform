package com.tanay.trading.service;

import com.tanay.trading.domain.VerificationType;
import com.tanay.trading.model.ForgotPasswordToken;
import com.tanay.trading.model.User;

public interface ForgotPasswordService
{
    ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType,
                                    String sendTo);

    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);
}
