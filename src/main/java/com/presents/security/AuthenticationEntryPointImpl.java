package com.presents.security;

import com.presents.users.UserService;
import com.presents.users.model.UserEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.Base64;

@Slf4j
public class AuthenticationEntryPointImpl implements AuthenticationEntryPoint {

    @Autowired
    private UserService userService;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException e) throws IOException, ServletException {
        final String authorization = request.getHeader("Authorization");
        if (authorization != null && authorization.startsWith("Basic")) {
            final String base64Credentials = authorization.substring("Basic".length()).trim();
            final String credentials = new String(Base64.getDecoder().decode(base64Credentials), Charset.forName("UTF-8"));
            final String[] values = credentials.split(":", 2);
            final String username = values[0];
            final UserEntity user = userService.findByEmail(username);

            if (user == null) {
                log.info("Login denied for user {}, reason: unknown login", username);
            } else if (user.isBlocked()){
                log.info("Login denied for user {}, reason: user is blocked", username);
            } else {
                log.info("Login denied for user {}, reason: wrong password", username);
            }
        }
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, e.getMessage());
    }
}
