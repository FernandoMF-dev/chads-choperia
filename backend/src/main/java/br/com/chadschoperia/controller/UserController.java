package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.UserService;
import br.com.chadschoperia.service.dto.UserDto;
import br.com.chadschoperia.service.dto.ViewUserDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<ViewUserDto>> findAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @GetMapping("/{idUser}")
    public ResponseEntity<UserDto> findById(@PathVariable Long idUser) {
        return ResponseEntity.ok(userService.findById(idUser));
    }

    @PostMapping
    public ResponseEntity<UserDto> create(@Valid @RequestBody UserDto userDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(userDto));
    }

    @PutMapping
    public ResponseEntity<UserDto> update(@Valid @RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.update(userDto));
    }

    @DeleteMapping("/{idUser}")
    public ResponseEntity<Void> deleteById(@PathVariable Long idUser) {
        userService.deleteById(idUser);
        return ResponseEntity.noContent().build();
    }

}
