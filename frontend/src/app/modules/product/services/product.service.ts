import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CrudService } from '../../../services/crud.service';
import { ManageStockProduct } from '../models/manage-stock-product.model';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService extends CrudService<Product> {
	constructor(protected override readonly http: HttpClient) {
		super(http, 'produto');
	}

	public restockProducts(queries: ManageStockProduct[], action: 'entry' | 'removal'): Observable<ManageStockProduct[]> {
		if (action === 'entry') {
			return this.http.post<ManageStockProduct[]>(`${ this.apiUrl }/restock`, queries);
		}
		return this.http.post<ManageStockProduct[]>(`${ this.apiUrl }/unstock`, queries);
	}
}
