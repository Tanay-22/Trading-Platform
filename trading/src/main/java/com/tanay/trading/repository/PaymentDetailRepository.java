package com.tanay.trading.repository;

import com.tanay.trading.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentDetailRepository extends JpaRepository<PaymentDetails, Long>
{
    PaymentDetails findByUserId(Long userId);
}
