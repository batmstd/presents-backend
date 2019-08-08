package com.presents.users;

import com.presents.security.UserEntityPasswordManager;
import com.presents.users.model.UserEntity;
import com.presents.users.model.UserRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.session.SessionInformation;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserEntityPasswordManager passwordManager;
    private final SessionRegistry sessionRegistry;

    @Transactional
    public void login(String email) {
        UserEntity userEntity = findByEmail(email);
        if (userEntity == null) {
            return;
        }
        log.info("User {} logged in", userEntity.getEmail());
    }

    @Transactional
    public void logout(String login) {
        UserEntity userEntity = findByEmail(login);
        if (userEntity == null) {
            return;
        }
        log.info("User {} logged out", userEntity.getEmail());
    }

    @Transactional
    public void changePassword(String login) {
        UserEntity userEntity = findByEmail(login);
        log.info("User {} changed password", userEntity.getEmail());
    }

    @Transactional
    public void create(UserEntity user) {
        String password = passwordManager.generatePassword(user);
        userRepository.save(user);
        log.info("Created user {}", user.getEmail());
//        mail.sendUserCreated(user, password);
    }

    @Transactional
    public void update(UserEntity user) {
        UserEntity db = findByEmail(user.getEmail());
        user.setId(db.getId());
        userRepository.save(user);
        log.info("Updated user {}", user.getEmail());
    }

    @Transactional
    public void delete(Integer id) {
        UserEntity user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("user not found " + id));
        userRepository.delete(user);
//        mail.sendUserDeleted(user);
        log.info("Deleted user {}", user.getEmail());
    }


    @Transactional
    public Optional<UserEntity> findOne(Integer id) {
        return userRepository.findById(id);
    }

    @Transactional
    public UserEntity findByEmail(String login) {
        return userRepository.findByEmail(login);
    }

    @Transactional
    public void resetPassword(UserEntity userEntity) {
        String password = passwordManager.generatePassword(userEntity);
        userRepository.save(userEntity);
//        mail.sendNewPassword(userEntity, password);

    }

    private void expireSessions(UserEntity user) {
        sessionRegistry.getAllPrincipals().forEach(principal -> {
            String login = ((User) principal).getUsername();
            if (login.equals(user.getEmail())) {
                sessionRegistry.getAllSessions(principal, true).forEach(SessionInformation::expireNow);
            }
        });
    }

}
