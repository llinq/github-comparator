import { CompareRequestModel } from './../models/compare-request.model';
// import { Colaborador } from 'app/models/colaborador';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RepositoryInfoModel } from '../models/repository-info.model';
import { CompareResponseModel } from '../models/compare-response.model';
import { RepositoryModel } from '../models/repository.model';
// import { ChangePasswordRequest } from 'app/models/change-password.request';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	
	repo1: RepositoryModel;
	repo2: RepositoryModel;

}
