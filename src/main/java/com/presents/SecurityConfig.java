package com.presents;

import com.presents.security.AuthenticationEntryPointImpl;
import com.zaxxer.hikari.HikariDataSource;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.session.SessionInformationExpiredStrategy;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Configuration
@AllArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true, securedEnabled = true)
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final HikariDataSource dataSource;

    @Bean("authenticationManagerBean")
    @Primary
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(guiUserDetailsManager()).passwordEncoder(guiPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/**")
                .csrf().disable()
                .formLogin().disable()
                .anonymous().disable()
                .httpBasic().authenticationEntryPoint(authenticationEntryPoint())
                .and()
                .authorizeRequests().anyRequest().authenticated()
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/")
                .deleteCookies("SSOSESSIONID")
                .clearAuthentication(true)
                .invalidateHttpSession(true)
                .and()
                .sessionManagement()
                .maximumSessions(10)
                .sessionRegistry(sessionRegistry())
                .expiredSessionStrategy(expiredSessionStrategy());

//        http.antMatcher("/gui/**");
//        http.csrf()
//                .disable();
//        http.formLogin()
//                .disable();
//        http.anonymous()
//                .disable();
//        http.httpBasic()
//                .authenticationEntryPoint(authenticationEntryPoint());
//        http.authorizeRequests()
//                .anyRequest()
//                .authenticated();
//        http.logout()
//                .logoutUrl("/gui/logout")
//                .logoutSuccessUrl("/")
//                .deleteCookies("SSOSESSIONID")
//                .clearAuthentication(true)
//                .invalidateHttpSession(true);
//        http.sessionManagement()
//                .maximumSessions(1)
//                .sessionRegistry(sessionRegistry())
//                .expiredSessionStrategy(expiredSessionStrategy());
    }

    @Bean("guiUserDetailsManager")
    public JdbcUserDetailsManager guiUserDetailsManager() throws Exception {
        final JdbcUserDetailsManager manager = new JdbcUserDetailsManager();
        manager.setDataSource(dataSource);
        manager.setAuthenticationManager(authenticationManagerBean());
        manager.setUsersByUsernameQuery("select email, password, not blocked as enabled from users where email = ?");
        manager.setAuthoritiesByUsernameQuery("select email, name from users where email = ?");
        manager.setDeleteUserSql("delete from users where email = ?");
        manager.setChangePasswordSql("update users set password = ? where email = ?");
        return manager;
    }

    @Bean("guiPasswordEncoder")
    public PasswordEncoder guiPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean("authenticationEntryPoint")
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return new AuthenticationEntryPointImpl();
    }

    @Bean("sessionRegistry")
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    private SessionInformationExpiredStrategy expiredSessionStrategy() {
        return event -> {
            HttpServletRequest request = event.getRequest();
            request.setAttribute("javax.servlet.error.status_code", HttpServletResponse.SC_UNAUTHORIZED);
            request.setAttribute("javax.servlet.error.message", "errors.auth.maxSessions");
            RequestDispatcher dispatcher = request.getRequestDispatcher("/error");
            dispatcher.forward(request, event.getResponse());
        };
    }
}
