package com.tanay.trading.service;

import com.tanay.trading.model.TwoFactorOTP;
import com.tanay.trading.model.User;

public interface TwoFactorOTPService
{
    TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt);

    TwoFactorOTP findByUser(Long userId);

    TwoFactorOTP findById(String id);

    boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp);

    void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP);
}
