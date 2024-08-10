package com.tanay.trading.service;

import com.tanay.trading.model.TwoFactorOTP;
import com.tanay.trading.model.User;
import com.tanay.trading.repository.TwoFactorOTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class TwoFactorOTPServiceImpl implements TwoFactorOTPService
{
    @Autowired
    private TwoFactorOTPRepository twoFactorOTPRepository;

    @Override
    public TwoFactorOTP createTwoFactorOtp(User user, String otp, String jwt)
    {
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        TwoFactorOTP twoFactorOTP = new TwoFactorOTP();
        twoFactorOTP.setOtp(otp);
        twoFactorOTP.setJwt(jwt);
        twoFactorOTP.setUser(user);

        return twoFactorOTPRepository.save(twoFactorOTP);
    }

    @Override
    public TwoFactorOTP findByUser(Long userId)
    {
        return twoFactorOTPRepository.findByUserId(userId);
    }

    @Override
    public TwoFactorOTP findById(String id)
    {
        Optional<TwoFactorOTP> opt = twoFactorOTPRepository.findById(id);
        return opt.orElse(null);
    }

    @Override
    public boolean verifyTwoFactorOtp(TwoFactorOTP twoFactorOTP, String otp)
    {
        return twoFactorOTP.getOtp().equals(otp);
    }

    @Override
    public void deleteTwoFactorOtp(TwoFactorOTP twoFactorOTP)
    {
        twoFactorOTPRepository.delete(twoFactorOTP);
    }
}
