package com.hust.zaloclonebackend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import javax.persistence.EntityManagerFactory;

@Configuration
@EnableJpaAuditing
public class JpaAuditConfig {

    @Autowired
    private EntityManagerFactory entityManagerFactory;

    @Bean
    public AuditorAware<String> auditorProvider() {
        return new SpringSecurityAuditorAware();
    }

//    @Bean(name = "jpa_transaction_manager")
//    @Primary
//    PlatformTransactionManager jpaTransactionManager() {
//        return new JpaTransactionManager(entityManagerFactory);
//    }
}
