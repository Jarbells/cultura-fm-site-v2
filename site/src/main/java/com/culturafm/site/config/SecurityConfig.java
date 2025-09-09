package com.culturafm.site.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Desativa a proteção CSRF, que é necessária para APIs stateless
            .csrf(AbstractHttpConfigurer::disable)
            
            .authorizeHttpRequests(authorize -> authorize
                // 2. Permite acesso público aos URLs de login do Spring/Auth0
                .requestMatchers("/error", "/login/**", "/oauth2/**").permitAll()
                
                // 3. ATUALIZADO: Permite acesso público aos endpoints GET com o prefixo /api
                .requestMatchers(HttpMethod.GET, "/api/programas/**", "/api/news/**", "/api/events/**", "/api/locutores/**", "/api/sponsors/**", "/api/radio-info/**", "/api/ws/**").permitAll()
                
                // 4. Exige autenticação para QUALQUER outro pedido (todos os POST, PUT, DELETE, etc.)
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .defaultSuccessUrl("http://localhost:5174", true)
            );
        
        return http.build();
    }
}