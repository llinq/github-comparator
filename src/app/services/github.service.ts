import { CompareRequestModel } from './../models/compare-request.model';
// import { Colaborador } from 'app/models/colaborador';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RepositoryInfoModel } from '../models/repository-info.model';
// import { ChangePasswordRequest } from 'app/models/change-password.request';

@Injectable({
	providedIn: 'root',
})
export class GithubService {
	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	search(filter: string): Observable<RepositoryInfoModel[]> {
		return this.http.get<RepositoryInfoModel[]>(`http://localhost:9462/api/comparator/search/${filter}`, {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
		});
	}

	compare(request: CompareRequestModel[]): Observable<any> {
		return this.http.post('http://localhost:9462/api/comparator/compare', request, {
			headers: new HttpHeaders().set('Content-Type', 'application/json')
		});
	}
}
