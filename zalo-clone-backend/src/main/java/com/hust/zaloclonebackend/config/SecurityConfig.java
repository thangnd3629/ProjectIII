package com.hust.zaloclonebackend.config;

import com.hust.zaloclonebackend.entity.User;
import com.hust.zaloclonebackend.service.UserDetailService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.savedrequest.NullRequestCache;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@AllArgsConstructor(onConstructor_ = @Autowired)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private UserDetailService userDetailsService;
    private BasicAuthenticationEndPoint basicAuthenticationEndPoint;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(this.userDetailsService).passwordEncoder(User.PASSWORD_ENCODER);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http
                .authorizeRequests()
                //permission to access all static resources
                .antMatchers("/resources/**").permitAll()
                .antMatchers("/css/**").permitAll()
                .antMatchers("/image/**").permitAll()
                .antMatchers("/js/**").permitAll()
                .regexMatchers("/v2/api-docs")
                .permitAll()
                .regexMatchers("/.*swagger.*")
                .permitAll()
                .regexMatchers(".*/user/register/*$")
                .permitAll()
                .regexMatchers(".*/app/.*$")
                .permitAll()
                .regexMatchers(".*/messenger/.*$")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .requestCache()
                .requestCache(new NullRequestCache())
                .and() // Not cache request because of having frontend
                .httpBasic()
                .authenticationEntryPoint(basicAuthenticationEndPoint)
                .and()
                .exceptionHandling()
                .and()
                .csrf()
                .disable()
                .logout()
                .logoutSuccessUrl("/");

    }


    @Bean
    @SuppressWarnings("unchecked")
    public FilterRegistrationBean corsFilterRegistrationBean() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        FilterRegistrationBean bean = new FilterRegistrationBean(new CorsFilter(source));
        bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
        return bean;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

}
