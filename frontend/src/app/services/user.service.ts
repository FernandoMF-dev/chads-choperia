import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from "../models/user.model";
import { CrudService } from "./crud.service";

@Injectable()
export class UserService extends CrudService<User> {
  constructor(protected override readonly http: HttpClient){
    super(http, 'usuario');
  }
}