package com.presents.users.controller;


import com.presents.JsonValue;
import com.presents.users.UserService;
import com.presents.users.model.ChangePasswordRequest;
import com.presents.users.model.User;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@AllArgsConstructor
@RestController
@RequestMapping("/login")
public class LoginController {

    private final UserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;

    @RequestMapping(value = "/user")
    public User getUser(Authentication authentication) {
        return new User(authentication.getName());
    }

    @RequestMapping(value = "/checkpass", method = RequestMethod.GET)
    public JsonValue<Boolean> isPasswordCorrect(@RequestParam("password") String password, Principal principal) {
        final UserDetails details = userDetailsManager.loadUserByUsername(principal.getName());
        return new JsonValue<>(passwordEncoder.matches(password, details.getPassword()));
    }

    @RequestMapping(value = "/changepass", method = RequestMethod.POST)
    public void changepass(@RequestBody ChangePasswordRequest request, Principal principal) {
        userDetailsManager.changePassword(request.getOldPassword(), passwordEncoder.encode(request.getNewPassword()));
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) principal;
        userService.changePassword(token.getName());
    }
}
