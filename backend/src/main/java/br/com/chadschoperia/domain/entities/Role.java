package br.com.chadschoperia.domain.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.io.Serializable;

@Entity
@Table(name = "role")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Role implements GrantedAuthority, Serializable {

	@Id
	@Column(name = "id", nullable = false)
	private Long id;

	@Column(name = "roleName", nullable = false)
	private String roleName;

	@Column(name = "deleted", nullable = false)
	private Boolean deleted = Boolean.FALSE;

	@Override
	public String getAuthority() {
		return this.roleName;
	}

	public Role(Long id){
		this.id = id;
	}
}
