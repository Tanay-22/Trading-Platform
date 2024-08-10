package com.tanay.trading.response;

import lombok.Data;

@Data
public class AuthResponse
{
    private String message;
    private String jwt;
    private boolean status;
    private boolean isTwoFactorAuthEnabled;
    private String session;
}
