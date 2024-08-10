package com.tanay.trading.utils;

import java.util.Random;

public class OtpUtils
{
    public static String generateOtp()
    {
        int optLenght = 4;
        Random random = new Random();

        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < optLenght; i++)
            otp.append(random.nextInt(10));

        return otp.toString();
    }
}
