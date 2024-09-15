package com.tanay.trading.request;

import lombok.Data;

@Data
public class SignUpRequest
{
    private String fullName;
    private String email;
    private Long mobile;
    private String password;
}
