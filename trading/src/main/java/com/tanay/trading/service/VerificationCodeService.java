package com.tanay.trading.service;

import com.tanay.trading.domain.VerificationType;
import com.tanay.trading.model.User;
import com.tanay.trading.model.VerificationCode;

public interface VerificationCodeService
{
    VerificationCode sendVerificationOtp(User user, VerificationType verificationType);

    VerificationCode getVerificationCodeById(Long id) throws Exception;

    VerificationCode getVerificationCodeByUser(Long userId);

    void deleteVerificationCode(VerificationCode verificationCode);

}
