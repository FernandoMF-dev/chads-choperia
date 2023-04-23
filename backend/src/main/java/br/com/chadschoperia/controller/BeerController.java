package br.com.chadschoperia.controller;

import br.com.chadschoperia.service.BeerService;
import br.com.chadschoperia.service.dto.BeerDto;
import br.com.chadschoperia.service.dto.PourBeerDTO;
import br.com.chadschoperia.service.dto.ProductStockDto;
import br.com.chadschoperia.service.dto.ViewBeerDto;
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
@RequestMapping("/api/chop")
@CrossOrigin(origins = "*", maxAge = 3600)
@RequiredArgsConstructor
public class BeerController {

	private final BeerService beerService;

	@GetMapping
	public ResponseEntity<List<ViewBeerDto>> findAll() {
		return ResponseEntity.ok(beerService.findAllView());
	}

	@GetMapping("/complete")
	public ResponseEntity<List<BeerDto>> findAllComplete() {
		return ResponseEntity.ok(beerService.findAllDto());
	}

	@GetMapping("/{idBeer}")
	public ResponseEntity<BeerDto> findById(@PathVariable Long idBeer) {
		return ResponseEntity.ok(beerService.findDtoById(idBeer));
	}

	@PostMapping
	public ResponseEntity<BeerDto> create(@Valid @RequestBody BeerDto beerDto) {
		return ResponseEntity.status(HttpStatus.CREATED).body(beerService.create(beerDto));
	}

	@PostMapping("/restock")
	public ResponseEntity<List<BeerDto>> restock(@RequestBody List<ProductStockDto> dto) {
		return ResponseEntity.status(HttpStatus.OK).body(beerService.restock(dto));
	}

	@PutMapping("/pour")
	public ResponseEntity<Void> pour(@RequestBody PourBeerDTO dto) {
		beerService.pour(dto);
		return ResponseEntity.status(HttpStatus.OK).build();
	}

	@PutMapping
	public ResponseEntity<BeerDto> update(@Valid @RequestBody BeerDto beerDto) {
		return ResponseEntity.ok(beerService.update(beerDto));
	}

	@DeleteMapping("/{idBeer}")
	public ResponseEntity<Void> deleteById(@PathVariable Long idBeer) {
		beerService.deleteById(idBeer);
		return ResponseEntity.noContent().build();
	}

}
