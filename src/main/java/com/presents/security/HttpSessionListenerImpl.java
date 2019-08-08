package com.presents.security;

import com.presents.users.UserService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

@Slf4j
@AllArgsConstructor
@Component
public class HttpSessionListenerImpl implements HttpSessionListener {
    private final UserService userService;

    @Override
    public void sessionCreated(HttpSessionEvent event) {
        writeOperationLog(true);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent event) {
        writeOperationLog(false);
    }

    private void writeOperationLog(boolean loginOrLogout) {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            log.debug((loginOrLogout ? "sessionCreated" : "sessionDestroyed") + " but authentication is null");
            return;
        }
        final String name = authentication.getName();
        if (loginOrLogout) {
            userService.login(name);
        } else {
            userService.logout(name);
        }
    }
}
