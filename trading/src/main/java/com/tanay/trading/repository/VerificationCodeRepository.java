package com.tanay.trading.repository;

import com.tanay.trading.domain.VerificationType;
import com.tanay.trading.model.VerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationCodeRepository extends JpaRepository<VerificationCode, Long>
{
    VerificationCode findByUserId(Long userId);

}
