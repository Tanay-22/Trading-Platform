package com.tanay.trading.model;

import com.tanay.trading.domain.PaymentMethod;
import com.tanay.trading.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PaymentOrder
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long amount;

    private PaymentOrderStatus status;

    @ManyToOne
    private User user;

    PaymentMethod paymentMethod;
}
