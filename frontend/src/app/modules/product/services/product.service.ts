import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../../../services/crud.service';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService extends CrudService<Product> {
  constructor(protected override readonly http: HttpClient){
    super(http, 'produto');
  }
}
