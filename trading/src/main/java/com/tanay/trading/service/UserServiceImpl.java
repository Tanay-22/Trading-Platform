package com.tanay.trading.service;

import com.tanay.trading.config.JwtProvider;
import com.tanay.trading.domain.VerificationType;
import com.tanay.trading.model.TwoFactorAuth;
import com.tanay.trading.model.User;
import com.tanay.trading.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService
{
    @Autowired
    private UserRepository userRepository;


    @Override
    public User findUserByJwt(String jwt) throws Exception
    {
        String email = JwtProvider.getEmailFromToken(jwt);

        return findUserByEmail(email);
    }

    @Override
    public User findUserByEmail(String email) throws Exception
    {
        User user = userRepository.findByEmail(email);

        if(user == null)
            throw new Exception("User not found");

        return user;
    }

    @Override
    public User findUserById(Long userId) throws Exception
    {
        Optional<User> userOptional = userRepository.findById(userId);

        if(userOptional.isEmpty())
            throw new Exception("User not Found");

        return userOptional.get();
    }

    @Override
    public User enableTwoFactorAuthentication(VerificationType verificationType, String sendTo, User user)
    {
        TwoFactorAuth twoFactorAuth = new TwoFactorAuth();
        twoFactorAuth.setEnabled(true);
        twoFactorAuth.setSendTo(verificationType);

        user.setTwoFactorAuth(twoFactorAuth);

        return userRepository.save(user);
    }

    @Override
    public User updatePassword(User user, String newPassword)
    {
        user.setPassword(newPassword);

        return userRepository.save(user);
    }
}
