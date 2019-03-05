import { CompareResponseModel } from './../../models/compare-response.model';
import { Component, OnInit, Input } from '@angular/core';
import { RepositoryModel, RepositoryValueEnumModel } from 'src/app/models/repository.model';

@Component({
	selector: 'card-repository',
	templateUrl: './card-repository.component.html',
	styleUrls: ['./card-repository.component.scss']
})
export class CardRepositoryComponent implements OnInit {

	conditionColorStars = {};
	conditionColorForks = {};
	conditionColorContributors = {};

	@Input() repository: RepositoryModel;

	constructor() { }

	ngOnInit() {
		this.conditionColorStars = this.createConditionColor('stars');
		this.conditionColorForks = this.createConditionColor('forks');
		this.conditionColorContributors = this.createConditionColor('contributors');

		console.log(JSON.stringify(this.repository));
	}

	private createConditionColor(property: string) {
		return {
				'green': this.repository[property].type === RepositoryValueEnumModel.BIGGER,
				'red': this.repository[property].type === RepositoryValueEnumModel.SMALLER,
				'blue': this.repository[property].type === RepositoryValueEnumModel.EQUAL
		}
	}

}
