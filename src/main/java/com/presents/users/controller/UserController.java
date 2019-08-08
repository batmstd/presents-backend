package com.presents.users.controller;

import com.presents.users.UserService;
import com.presents.users.model.UserEntity;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public void create(@RequestBody UserEntity user) {
        userService.create(user);
    }

    @RequestMapping(value = "/find-by-email")
    public UserEntity findByLogin(@RequestParam("email") String email) {
        return userService.findByEmail(email);
    }

    @RequestMapping(value = "/user/{id}", method = RequestMethod.GET)
    public Optional<UserEntity> user(@PathVariable("id") Integer id) {
        return userService.findOne(id);
    }

    @RequestMapping(value = "/{user:\\d+}", method = RequestMethod.PUT)
    public void update(@RequestBody UserEntity user) {
        userService.update(user);
    }

    @RequestMapping(value = "/reset-password", method = RequestMethod.POST)
    public void resetPassword(@RequestParam String email) {
        userService.resetPassword(userService.findByEmail(email));
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public void delete(@PathVariable("id") Integer id) {
        userService.delete(id);
    }
}
