import { ViewBeer } from './view-beer.model';

export interface ManageStockBeer {
	beer: ViewBeer;
	amount: number;
	productId?: number;
}
