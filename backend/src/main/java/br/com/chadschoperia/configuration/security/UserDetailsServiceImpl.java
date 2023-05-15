package br.com.chadschoperia.configuration.security;

import br.com.chadschoperia.domain.entities.User;
import br.com.chadschoperia.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

	private final UserRepository repository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = repository.findByUsername(username)
				.orElseThrow( () -> new UsernameNotFoundException("user.username.not_found" + username));
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), true,true,true,true,user.getAuthorities());
	}
}
