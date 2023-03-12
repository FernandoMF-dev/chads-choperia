import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

import { CrudService } from "./crud.service";

@Injectable()
export class ProductService extends CrudService<Product> {
  constructor(protected override readonly http: HttpClient){
    super(http, 'produto');
  }
}