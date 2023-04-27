package com.preproject.stackOverFlowClone.auth.config;

import com.preproject.stackOverFlowClone.auth.filter.JwtAuthenticationFilter;
import com.preproject.stackOverFlowClone.auth.filter.JwtVerificationFilter;
import com.preproject.stackOverFlowClone.auth.handler.MemberAuthenticationSuccessHandler;
import com.preproject.stackOverFlowClone.auth.jwt.JwtTokenizer;
import com.preproject.stackOverFlowClone.auth.utils.CustomAuthorityUtils;
import com.preproject.stackOverFlowClone.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity(debug = true)
//@RequiredArgsConstructor
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    MemberRepository memberRepository;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberRepository = memberRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().disable()
                .and()
                .csrf().disable()
                .cors().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
//                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())  // 추가
//                .accessDeniedHandler(new MemberAccessDeniedHandler())            // 추가
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/*/signUp").permitAll()
                        .antMatchers(HttpMethod.POST, "/*/login").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/*/member").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/member/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.GET, "/*/member").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/member/**").hasRole("ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/*/member").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/*/member/**").hasRole("ADMIN")

                        .antMatchers(HttpMethod.POST, "/*/ask").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/ask/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/ask").permitAll()
                        .antMatchers(HttpMethod.GET, "/*/ask/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/*/ask/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/*/answer").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/answer/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/answer/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/*/answer/**").hasAnyRole("USER", "ADMIN")

                        .antMatchers(HttpMethod.POST, "/*/comment").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/*/comment/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/comment/**").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/*/comment/**").hasAnyRole("USER", "ADMIN")
                        .anyRequest().permitAll()
                );
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler(memberRepository));
//            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
