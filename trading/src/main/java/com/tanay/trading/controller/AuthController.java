package com.tanay.trading.controller;

import com.tanay.trading.config.JwtProvider;
import com.tanay.trading.model.TwoFactorOTP;
import com.tanay.trading.model.User;
import com.tanay.trading.repository.UserRepository;
import com.tanay.trading.response.AuthResponse;
import com.tanay.trading.service.CustomUserDetailService;
import com.tanay.trading.service.EmailService;
import com.tanay.trading.service.TwoFactorOTPService;
import com.tanay.trading.service.WatchlistService;
import com.tanay.trading.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController
{
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Autowired
    private TwoFactorOTPService twoFactorOTPService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private WatchlistService watchlistService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> register(@RequestBody User user) throws Exception
    {
        User isUserExist = userRepository.findByEmail(user.getEmail());

        if(isUserExist != null)
            throw new Exception("Email already linked with another account");

        User createdUser = new User();
        createdUser.setPassword(user.getPassword());
        createdUser.setEmail(user.getEmail());
        createdUser.setFullName(user.getFullName());

        User savedUser = userRepository.save(createdUser);
        watchlistService.createWatchlist(savedUser);

        Authentication auth = new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("Registered Successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> login(@RequestBody User user) throws Exception
    {
        Authentication auth = authenticate(user);
        SecurityContextHolder.getContext().setAuthentication(auth);

        String jwt = JwtProvider.generateToken(auth);

        User authUser = userRepository.findByEmail(user.getEmail());

        if(user.getTwoFactorAuth().isEnabled())
        {
            AuthResponse res = new AuthResponse();
            res.setMessage("Two Factor Enabled");
            res.setTwoFactorAuthEnabled(true);
            String otp = OtpUtils.generateOtp();

            TwoFactorOTP oldTwoFactorOTP = twoFactorOTPService.findByUser(authUser.getId());
            if(oldTwoFactorOTP != null)
                twoFactorOTPService.deleteTwoFactorOtp(oldTwoFactorOTP);

            TwoFactorOTP newTwoFactorOTP = twoFactorOTPService.createTwoFactorOtp(authUser, otp, jwt);

            emailService.sendVerificationOtpEmail(user.getFullName(), otp);

            res.setSession(newTwoFactorOTP.getId());

            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }
        AuthResponse res = new AuthResponse();
        res.setJwt(jwt);
        res.setStatus(true);
        res.setMessage("Login Successfully");

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    private Authentication authenticate(User user)
    {
        UserDetails userDetails = customUserDetailService.loadUserByUsername(user.getEmail());
        if(userDetails == null)
            throw new BadCredentialsException("Invalid Email");

        if(!user.getPassword().equals(userDetails.getPassword()))
            throw new BadCredentialsException("Invalid Password");

        return new UsernamePasswordAuthenticationToken(userDetails, user.getPassword(),
                userDetails.getAuthorities());
    }

    @PostMapping("/two-factor/otp/{otp}")
    public ResponseEntity<AuthResponse> verifySigninOtp(@PathVariable String otp, @RequestParam String id)
            throws Exception
    {
        TwoFactorOTP twoFactorOTP = twoFactorOTPService.findById(id);

        if(twoFactorOTPService.verifyTwoFactorOtp(twoFactorOTP, otp))
        {
            AuthResponse res = new AuthResponse();
            res.setMessage("Two Factor authentication verified");
            res.setTwoFactorAuthEnabled(true);
            res.setJwt(twoFactorOTP.getJwt());

            return new ResponseEntity<>(res, HttpStatus.OK);
        }
        throw new Exception("Invalid Otp");
    }
}
