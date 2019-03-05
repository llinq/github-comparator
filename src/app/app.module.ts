import { CustomProgressBarModule } from './components/custom-progress-bar/custom-progress-bar.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule, MatAutocompleteModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GithubInterceptor } from './interceptors/github.interceptor';
import { ComparatorComponent } from './pages/comparator/comparator.component';
import { HomeComponent } from './pages/home/home.component';
import { CardRepositoryComponent } from './components/card-repository/card-repository.component';

@NgModule({
  declarations: [
    AppComponent,
    ComparatorComponent,
    HomeComponent,
    CardRepositoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	BrowserAnimationsModule,
	FlexLayoutModule,

	MatInputModule,
	MatFormFieldModule,
	MatButtonModule,
	MatCardModule,
	MatAutocompleteModule,
	MatProgressSpinnerModule,
	MatIconModule,
	CustomProgressBarModule,
	
	ReactiveFormsModule,
	HttpClientModule
  ],
  providers: [
	{ provide: HTTP_INTERCEPTORS, useClass: GithubInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
