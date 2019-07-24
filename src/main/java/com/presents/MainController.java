package com.presents;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/example")
public class MainController {

    @GetMapping
    public String example() {
        return "{\"somekey\":\"somevalue\"}";
    }
}
