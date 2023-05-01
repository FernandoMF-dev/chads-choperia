import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { UtilsService } from '../../../../services/utils.service';
import { Beer } from '../../models/beer.model';
import { Select } from '../../models/select.model';
import { BeerService } from '../../services/beer.service';

@Component({
	selector: 'app-beer-card',
	templateUrl: './beer-card.component.html',
	styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent implements OnInit {

	@Input() beers: Beer[] = [];
	@Output() onSelectBeer: EventEmitter<Beer> = new EventEmitter<Beer>();


	constructor(

	) {
	}


	ngOnInit(): void {

	}


	emitBeer(beer: Beer){
		this.onSelectBeer.emit(beer)
	}
}
