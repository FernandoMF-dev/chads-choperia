import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrudService } from '../../../services/crud.service';

import { User } from '../models/user.model';

@Injectable()
export class UserService extends CrudService<User> {
	constructor(protected override readonly http: HttpClient) {
		super(http, 'usuario');
	}

	public login(user: User): Observable<any>{
		return this.http.post(`${this.apiUrl}/login`,user)
	}

}
