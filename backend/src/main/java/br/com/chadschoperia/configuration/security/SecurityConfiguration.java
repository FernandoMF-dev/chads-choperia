package br.com.chadschoperia.configuration.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableMethodSecurity
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http
				.httpBasic()
				.and()
				.authorizeHttpRequests()
				.requestMatchers(HttpMethod.POST, "**/login").permitAll()
				.requestMatchers(HttpMethod.GET, "**/chop/complete").permitAll()
				.requestMatchers(HttpMethod.PUT, "**/chop/pour").permitAll()
				.requestMatchers(HttpMethod.POST, "**/self-service/purchase").permitAll()
				.requestMatchers(HttpMethod.GET, "**/card/client/rfid/**").permitAll()
				.anyRequest().authenticated()
				.and()
				.cors()
				.and()
				.csrf().disable();

		return http.build();
	}


	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
