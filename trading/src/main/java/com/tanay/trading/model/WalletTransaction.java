package com.tanay.trading.model;

import com.tanay.trading.domain.WalletTransactionType;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class WalletTransaction
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Wallet wallet;

    private WalletTransactionType transactionType;

    private LocalDate date;

    private String transferId;

    private String purpose;

    private Long amount;
}
