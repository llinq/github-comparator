import { CompareResponseModel } from './models/compare-response.model';
import { ComparatorComponent } from './pages/comparator/comparator.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'comparator', component: ComparatorComponent },
	{ path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
