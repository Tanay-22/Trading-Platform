package com.tanay.trading.controller;

import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.domain.VerificationType;
import com.tanay.trading.model.ForgotPasswordToken;
import com.tanay.trading.model.User;
import com.tanay.trading.model.VerificationCode;
import com.tanay.trading.service.EmailService;
import com.tanay.trading.service.ForgotPasswordService;
import com.tanay.trading.service.UserService;
import com.tanay.trading.service.VerificationCodeService;
import com.tanay.trading.utils.OtpUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/user")
public class UserController
{
    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationCodeService verificationCodeService;

    @Autowired
    private ForgotPasswordService forgotPasswordService;


    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(@RequestHeader(JwtConstant.JWT_HEADER) String jwt) throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/enable-two-factor/verification/{verificationType}/send-otp")
    public ResponseEntity<String> sendVerificationOtp(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                                    @PathVariable VerificationType verificationType)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        if(verificationCode == null)
            verificationCode = verificationCodeService.sendVerificationOtp(user, verificationType);

        if(verificationType.equals(VerificationType.EMAIL))
            emailService.sendVerificationOtpEmail(user.getEmail(), verificationCode.getOtp());


        return new ResponseEntity<>("Verification Otp sent successfully", HttpStatus.OK);
    }

    @PatchMapping("/enable-two-factor/verify-otp/{otp}")
    public ResponseEntity<User> enableTwoFactorAuthentication(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                                              @PathVariable String otp)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);

        VerificationCode verificationCode = verificationCodeService.getVerificationCodeByUser(user.getId());

        String sendTo = verificationCode.getVerificationType().equals(VerificationType.EMAIL)
                ? verificationCode.getEmail() : verificationCode.getMobile();

        boolean isVerified = verificationCode.getOtp().equals(otp);

        if(isVerified)
        {
            User updatedUser = userService.enableTwoFactorAuthentication(verificationCode.getVerificationType(),
                    sendTo, user);
            verificationCodeService.deleteVerificationCode(verificationCode);

            return new ResponseEntity<>(updatedUser, HttpStatus.OK);
        }
        throw new Exception("Wrong Otp");
    }

    @PostMapping("/reset-password/send-otp")
    public ResponseEntity<String> sendForgotPasswordOtp(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                                      @PathVariable VerificationType verificationType)
            throws Exception
    {
        User user = userService.findUserByJwt(jwt);
        String otp = OtpUtils.generateOtp();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());-


        return new ResponseEntity<>("Forgot Password Otp sent successfully", HttpStatus.OK);
    }
}
