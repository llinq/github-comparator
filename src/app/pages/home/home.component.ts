import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RepositoryInfoModel } from 'src/app/models/repository-info.model';
import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { GithubService } from 'src/app/services/github.service';
import { CustomProgressBarService } from 'src/app/components/custom-progress-bar/custom-progress-bar.service';
import { CompareRequestModel } from 'src/app/models/compare-request.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	form: FormGroup;

	isLoading1: boolean;
	isLoading2: boolean;

	filteredRepository1: RepositoryInfoModel[];
	filteredRepository2: RepositoryInfoModel[];

	filter1HasSelected: boolean;
	filter2HasSelected: boolean;

	comparing: boolean;

	constructor(
		private githubService: GithubService,
		private formBuilder: FormBuilder,
		private customProgressbarService: CustomProgressBarService
	) { }

	ngOnInit(): void {

		// setTimeout(() => {
		// 	this.customProgressbarService.show();
		// }, 1000);

		this.form = this.formBuilder.group({
			filter1: [''],
			filter2: [''],
		});

		this.form
			.get('filter1')
			.valueChanges
			.pipe(
				debounceTime(150),
				tap(() => this.isLoading1 = true),
				switchMap(value => value && !this.filter1HasSelected ? this.githubService.search(value) : []
				)
			)
			.subscribe(repositoryInfo => {
				this.filteredRepository1 = repositoryInfo;
				this.isLoading1 = false;
			});

		this.form
			.get('filter2')
			.valueChanges
			.pipe(
				debounceTime(150),
				tap(() => this.isLoading2 = true),
				switchMap(value => value && !this.filter2HasSelected ? this.githubService.search(value) : []
				)
			)
			.subscribe(repositoryInfo => {
				this.filteredRepository2 = repositoryInfo;
				this.isLoading2 = false;
			});
	}

	displayFn(repository: RepositoryInfoModel) {
		if (repository) {
			// return `${repository.name} | ${repository.description}`; 
			return repository.name;
		}
	}

	filter1Selected(): void {
		this.filter1HasSelected = true;
		this.form.get('filter1').disable();
	}

	clearFilter1(): void {
		this.filter1HasSelected = false;
		this.form.get('filter1').enable();
		this.form.get('filter1').setValue('');
	}

	filter2Selected(): void {
		this.filter2HasSelected = true;
		this.form.get('filter2').disable();
	}

	clearFilter2(): void {
		this.filter2HasSelected = false;
		this.form.get('filter2').enable();
		this.form.get('filter2').setValue('');
	}

	compare(): void {
		const form = this.form.getRawValue();

		const request = <CompareRequestModel[]>[
			{
				repository_id: form.filter1.repository_id
			}, {
				repository_id: form.filter2.repository_id
			}
		];

		this.comparing = true;

		this.githubService.compare(request)
			.pipe(
				finalize(() => this.comparing = false)
			)
			.subscribe((response) => {
				console.log(response);
			});
	}
}
