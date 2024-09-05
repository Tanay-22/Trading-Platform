package com.tanay.trading.controller;

import com.tanay.trading.config.JwtConstant;
import com.tanay.trading.domain.VerificationType;
import com.tanay.trading.model.ForgotPasswordToken;
import com.tanay.trading.model.User;
import com.tanay.trading.model.VerificationCode;
import com.tanay.trading.request.ForgotPasswordTokenRequest;
import com.tanay.trading.request.ResetPasswordRequest;
import com.tanay.trading.response.ApiResponse;
import com.tanay.trading.response.AuthResponse;
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
@RequestMapping("/api/user")
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
        System.out.println(jwt);
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
    public ResponseEntity<AuthResponse> sendForgotPasswordOtp(@RequestBody ForgotPasswordTokenRequest req) throws Exception
    {
        User user = userService.findUserByEmail(req.getSendTo());
        String otp = OtpUtils.generateOtp();
        UUID uuid = UUID.randomUUID();
        String id = uuid.toString();

        ForgotPasswordToken token = forgotPasswordService.findByUser(user.getId());

        if(token == null)
            token = forgotPasswordService.createToken(user, id, otp, req.getVerificationType(), req.getSendTo());

        if(req.getVerificationType().equals(VerificationType.EMAIL))
            emailService.sendVerificationOtpEmail(user.getEmail(), token.getOtp());

        AuthResponse res = new AuthResponse();
        res.setSession(token.getId());
        res.setMessage("Password reset otp sent successfully");

        return new ResponseEntity<>(res, HttpStatus.OK);
    }


    @PatchMapping("/reset-password/verify-otp")
    public ResponseEntity<ApiResponse> resetPassword(@RequestHeader(JwtConstant.JWT_HEADER) String jwt,
                                              @RequestParam String id,
                                              @RequestBody ResetPasswordRequest req)
            throws Exception
    {
        ForgotPasswordToken forgotPasswordToken = forgotPasswordService.findById(id);

        boolean isVerified = forgotPasswordToken.getOtp().equals(req.getOtp());

        if(isVerified)
        {
            userService.updatePassword(forgotPasswordToken.getUser(), req.getPassword());
            ApiResponse res = new ApiResponse();
            res.setMessage("Password set successfully");

            return new ResponseEntity<>(res, HttpStatus.ACCEPTED);
        }
        throw new Exception("Wrong Otp");
    }
}
