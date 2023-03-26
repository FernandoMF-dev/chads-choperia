import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from '../../../services/crud.service';
import { Client } from '../models/client.model';

@Injectable({
	providedIn: 'root'
})
export class ClientService extends CrudService<Client> {
	constructor(protected override readonly http: HttpClient) {
		super(http, 'cliente');
	}
}
