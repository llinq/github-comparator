import { CustomEncoderHelper } from './../helpers/custom-encoder.helper';
import { RepositoryModel, RepositoryValueEnumModel, RepositoryValueModel } from './../models/repository.model';
import { CompareRequestModel } from './../models/compare-request.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RepositoryInfoModel } from '../models/repository-info.model';
import { CompareResponseModel } from '../models/compare-response.model';
import { KeyValueModel } from '../models/key-value.model';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class GithubService {
	constructor(
		private http: HttpClient,
		private router: Router
	) { }

	search(filter: string): Observable<RepositoryInfoModel[]> {

		let params = new HttpParams({
			encoder: new CustomEncoderHelper()
		});

		params = params.set('filter', filter);

		return this.http.get<RepositoryInfoModel[]>(`${environment.api}/comparator/search`, {
			params: params
		});
	}

	compare(request: CompareRequestModel[]): Observable<CompareResponseModel[]> {
		return this.http.post<CompareResponseModel[]>(`${environment.api}/comparator/compare`, request);
	}

	convert(repo1: CompareResponseModel, repo2: CompareResponseModel): KeyValueModel<string, RepositoryModel>[] {
		let response1 = new KeyValueModel<string, RepositoryModel>();
		let response2 = new KeyValueModel<string, RepositoryModel>();

		const repositoryValueEnumStars = this.checkRepositoryValueType(repo1.stars, repo2.stars);
		const repositoryValueEnumForks = this.checkRepositoryValueType(repo1.forks, repo2.forks);
		const repositoryValueEnumContributors = this.checkRepositoryValueType(repo1.contributors, repo2.contributors);

		response1.key = 'repo1';
		response1.value = this.createRepositoryModel(
			repo1,
			repositoryValueEnumStars.find(r => r.key === 'repo1').value,
			repositoryValueEnumForks.find(r => r.key === 'repo1').value,
			repositoryValueEnumContributors.find(r => r.key === 'repo1').value
		);

		response2.key = 'repo2';
		response2.value = this.createRepositoryModel(
			repo2,
			repositoryValueEnumStars.find(r => r.key === 'repo2').value,
			repositoryValueEnumForks.find(r => r.key === 'repo2').value,
			repositoryValueEnumContributors.find(r => r.key === 'repo2').value
		);

		return [response1, response2];
	}

	private checkRepositoryValueType(
		value1: number,
		value2: number
	): KeyValueModel<string, RepositoryValueModel>[] {

		let response1 = new KeyValueModel<string, RepositoryValueModel>(
			'repo1',
			<RepositoryValueModel>{
				value: value1,
				differ: value1 - value2
			}
		);

		let response2 = new KeyValueModel<string, RepositoryValueModel>(
			'repo2',
			<RepositoryValueModel>{
				value: value2,
				differ: value2 - value1
			}
		);

		if (value1 > value2) {
			response1.value.type = RepositoryValueEnumModel.BIGGER;
			response2.value.type = RepositoryValueEnumModel.SMALLER;
		}
		else if (value1 < value2) {
			response1.value.type = RepositoryValueEnumModel.SMALLER;
			response2.value.type = RepositoryValueEnumModel.BIGGER;
		}
		else {
			response1.value.type = RepositoryValueEnumModel.EQUAL;
			response2.value.type = RepositoryValueEnumModel.EQUAL;
		}

		return [response1, response2];
	}

	private createRepositoryModel(
		repository: CompareResponseModel,
		starsRepository: RepositoryValueModel,
		forksRepository: RepositoryValueModel,
		contributorsRepository: RepositoryValueModel
	): RepositoryModel {
		return <RepositoryModel>{
			name: repository.name,
			description: repository.description,
			stars: starsRepository,
			forks: forksRepository,
			contributors: contributorsRepository
		};
	}
}
