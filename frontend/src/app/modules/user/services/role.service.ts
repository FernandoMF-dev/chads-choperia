import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../../../services/crud.service';
import { Role } from '../models/role.model';

@Injectable()
export class RoleService extends CrudService<Role> {
  constructor(protected override readonly http: HttpClient){
    super(http, 'funcao');
  }
}
