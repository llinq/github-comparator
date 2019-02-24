import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, empty, throwError } from 'rxjs';
import { catchError, finalize, switchMap, filter, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { CustomProgressBarService } from '../components/custom-progress-bar/custom-progress-bar.service';

@Injectable({
	providedIn: 'root',
})
export class GithubInterceptor implements HttpInterceptor {

	isRefreshingToken: boolean;
	tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

	constructor(
		private fuseProgressBarService: CustomProgressBarService,
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.fuseProgressBarService.show();

		const headers = new HttpHeaders({
			'Content-Type': 'application/json'
		});

		const cloneReq = request.clone({ headers });

		return next.handle(cloneReq)
			.pipe(
				finalize(() => {
					this.fuseProgressBarService.hide();
				}));
	}
}
