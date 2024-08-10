package com.tanay.trading.service;

import com.tanay.trading.domain.VerificationType;
import com.tanay.trading.model.User;

public interface UserService
{
    User findUserByJwt(String jwt) throws Exception;

    User findUserByEmail(String email) throws Exception;

    User findUserById(Long userId) throws Exception;

    User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user);

    User updatePassword(User user, String newPassword);
}
