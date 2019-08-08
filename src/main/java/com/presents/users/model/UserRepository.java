package com.presents.users.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    UserEntity findByEmail(String email);

    @Modifying
    @Query("update UserEntity e set e.password = :password where e.id = :id")
    void updatePassword(@Param("id") long id, @Param("password") String password);

}
