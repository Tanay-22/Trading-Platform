package com.tanay.trading.model;

import com.tanay.trading.domain.WithdrawalStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Withdrawal
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private WithdrawalStatus status;

    private Long amount;

    @OneToOne
    private User user;

    private LocalDateTime date = LocalDateTime.now();
}
