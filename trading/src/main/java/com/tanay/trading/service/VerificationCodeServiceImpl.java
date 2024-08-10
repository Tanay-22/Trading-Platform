package com.tanay.trading.service;

import com.tanay.trading.domain.VerificationType;
import com.tanay.trading.model.User;
import com.tanay.trading.model.VerificationCode;
import com.tanay.trading.repository.VerificationCodeRepository;
import com.tanay.trading.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class VerificationCodeServiceImpl implements VerificationCodeService
{
    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    @Override
    public VerificationCode sendVerificationOtp(User user, VerificationType verificationType)
    {
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setOtp(OtpUtils.generateOtp());
        verificationCode.setVerificationType(verificationType);
        verificationCode.setUser(user);

        return verificationCodeRepository.save(verificationCode);
    }

    @Override
    public VerificationCode getVerificationCodeById(Long id) throws Exception
    {
        Optional<VerificationCode> verificationCodeOpt = verificationCodeRepository.findById(id);

        if(verificationCodeOpt.isPresent())
            return verificationCodeOpt.get();

        throw new Exception("Verification code not found");
    }

    @Override
    public VerificationCode getVerificationCodeByUser(Long userId)
    {
        return verificationCodeRepository.findByUserId(userId);
    }

    @Override
    public void deleteVerificationCode(VerificationCode verificationCode)
    {
        verificationCodeRepository.delete(verificationCode);
    }
}
