package com.hust.zaloclonebackend.config.session;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;
import org.springframework.session.data.redis.RedisSessionRepository;
import org.springframework.session.web.http.HeaderHttpSessionIdResolver;
import org.springframework.session.web.http.HttpSessionIdResolver;

import java.time.Duration;

@Configuration
@EnableSpringHttpSession
@Slf4j
public class SessionConfig {

    @Value("${spring.redis.host}")
    private String host;

    @Value("${spring.redis.port}")
    private Integer port;

    @Bean
    public LettuceConnectionFactory redisConnectionFactory() {
        log.info("redisConnectionFactory");
        return new LettuceConnectionFactory(new RedisStandaloneConfiguration(host, port));
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate() {
        log.info("redisTemplate");
        return RedisSerializationBuilder.getDefaultRedisTemplate(redisConnectionFactory());
    }

    @Bean
    public RedisOperations<String, Object> redisOperations() {
        log.info("redisOperations");
        return RedisSerializationBuilder.getSnappyRedisTemplate(redisConnectionFactory(), Object.class);
    }

    @Bean
    public RedisSessionRepository sessionRepository(RedisTemplate<String, Object> redisTemplate) {
        log.info("sessionRepository");
        RedisSessionRepository redisSessionRepository = new RedisSessionRepository(redisTemplate);
        redisSessionRepository.setDefaultMaxInactiveInterval( Duration.ofDays(365L));
        return redisSessionRepository;
    }

    /**
     * Customize Spring Session’s HttpSession integration to use HTTP headers X-Auth-Token
     * to convey the current session information instead of cookies,
     * <a href="https://docs.spring.io/spring-session/docs/current/reference/html5/guides/java-rest.html">reference</a>
     *
     * @return
     */
    @Bean
    public HttpSessionIdResolver httpSessionIdResolver() {
        log.info("httpSessionIdResolver");
        return HeaderHttpSessionIdResolver.xAuthToken();
    }
}

