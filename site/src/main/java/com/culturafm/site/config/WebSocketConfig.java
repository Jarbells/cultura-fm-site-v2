// src/main/java/com/culturafm/site/config/WebSocketConfig.java

package com.culturafm.site.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker // Habilita o nosso servidor de mensagens
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // Habilita um "broker" de mensagens simples. Os clientes irão subscrever a tópicos que começam com "/topic"
        config.enableSimpleBroker("/topic");
        // Define o prefixo para mensagens que são destinadas a métodos de controlo (não usaremos isto agora, mas é boa prática)
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // Regista o endpoint "/ws". É este o URL a que os nossos clientes React se irão ligar.
        // O withSockJS() é uma opção de fallback para navegadores mais antigos.
        registry.addEndpoint("/ws")
                // Permite o acesso de todas as origens para o WebSocket
                .setAllowedOrigins("*") 
                .withSockJS();
    }
}