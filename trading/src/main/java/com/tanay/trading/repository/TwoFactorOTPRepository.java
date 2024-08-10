package com.tanay.trading.repository;

import com.tanay.trading.model.TwoFactorOTP;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TwoFactorOTPRepository extends JpaRepository<TwoFactorOTP, String>
{
    TwoFactorOTP findByUserId(Long userId);
}
