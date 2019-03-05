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
			this.repo1 = {"name":"lantern","description":"🔴蓝灯最新版本下载 https://github.com/getlantern/download 🔴 Lantern Latest Download https://github.com/getlantern/download 🔴","stars":{"value":40620,"differ":40620,"type":1},"forks":{"value":8957,"differ":8957,"type":1},"contributors":{"value":54,"differ":54,"type":1}};

			this.repo2 = {"name":"test","description":"asadd","stars":{"value":0,"differ":-40620,"type":2},"forks":{"value":0,"differ":-8957,"type":2},"contributors":{"value":0,"differ":-54,"type":2}};
		}

	}

}
