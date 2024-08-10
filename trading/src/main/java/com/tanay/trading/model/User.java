package com.tanay.trading.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tanay.trading.domain.UserRole;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class User
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String fullName;
    private String email;
    private Long mobile;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Embedded
    private TwoFactorAuth twoFactorAuth = new TwoFactorAuth();

    private UserRole userRole = UserRole.CUSTOMER;

}
