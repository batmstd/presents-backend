package com.presents.security;

import com.presents.users.model.UserEntity;
import lombok.AllArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class UserEntityPasswordManager {
    private static final int PASSWORD_DEFAULT_LENGTH = 10;

    private final PasswordEncoder passwordEncoder;

    public String generatePassword(UserEntity userEntity) {
        String password = RandomStringUtils.randomAlphanumeric(PASSWORD_DEFAULT_LENGTH);
        String encodePassword = passwordEncoder.encode(password);
        userEntity.setPassword(encodePassword);
        return password;
    }
}
