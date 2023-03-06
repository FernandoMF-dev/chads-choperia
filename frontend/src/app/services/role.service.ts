import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';

import { CrudService } from "./crud.service";

@Injectable()
export class RoleService extends CrudService<Role> {
  constructor(protected override readonly http: HttpClient){
    super(http, 'funcao');
  }
}