package com.tanay.trading.repository;

import com.tanay.trading.model.Withdrawal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WithdrawalRepository extends JpaRepository<Withdrawal, Long>
{
    List<Withdrawal> findByUserId(Long userId);
}
