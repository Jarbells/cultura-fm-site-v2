package com.culturafm.site.controllers;

import java.security.Principal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserInfoController {

    @GetMapping("/api/user")
    public Principal getUserInfo(Principal principal) {
        // Se o utilizador estiver autenticado, o Spring Security injeta os dados aqui.
        // Se não, o endpoint é protegido e retorna 401 Unauthorized, 
        // que é o que o frontend espera para saber que não há login.
        return principal;
    }
}