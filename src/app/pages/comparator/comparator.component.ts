import { CompareResponseModel } from './../../models/compare-response.model';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { RepositoryInfoModel } from 'src/app/models/repository-info.model';
import { RepositoryModel } from 'src/app/models/repository.model';

@Component({
	selector: 'app-comparator',
	templateUrl: './comparator.component.html',
	styleUrls: ['./comparator.component.scss', '../../app.component.scss']
})
export class ComparatorComponent implements OnInit {

	repo1: RepositoryModel;
	repo2: RepositoryModel;

	constructor(
		private dataService: DataService,
		private router: Router
	) { }

	ngOnInit() {

		if (this.dataService.repo1) {

			this.repo1 = this.dataService.repo1;
			this.repo2 = this.dataService.repo2;

		}
		else {
			// this.router.navigate(['/']);
			this.repo1 = {"name":"react","description":"A declarative, efficient, and flexible JavaScript library for building user interfaces.","stars":{"value":123624,"differ":-5970,"type":2},"forks":{"value":22452,"differ":3958,"type":1},"contributors":{"value":443,"differ":179,"type":1}};

			this.repo2 = {"name":"vue","description":"🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.","stars":{"value":129594,"differ":5970,"type":1},"forks":{"value":18494,"differ":-3958,"type":2},"contributors":{"value":264,"differ":-179,"type":2}};
		}

	}

}
