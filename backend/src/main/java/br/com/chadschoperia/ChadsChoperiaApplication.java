package br.com.chadschoperia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ChadsChoperiaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChadsChoperiaApplication.class, args);
		System.out.println("senha: " +   new BCryptPasswordEncoder().encode("senha123"));
	}

}
