package br.com.chadschoperia.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class DropdownDto implements Serializable {

    private Long id;

    private String name;

}
