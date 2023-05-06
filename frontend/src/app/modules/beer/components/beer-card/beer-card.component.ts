import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Beer } from '../../models/beer.model';

@Component({
	selector: 'app-beer-card',
	templateUrl: './beer-card.component.html',
	styleUrls: ['./beer-card.component.scss']
})
export class BeerCardComponent {

	@Input() beers: Beer[] = [];
	@Output() selectBeer: EventEmitter<Beer> = new EventEmitter<Beer>();

	emitBeer(beer: Beer) {
		this.selectBeer.emit(beer);
	}
}
