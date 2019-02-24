import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule, MatProgressBarModule } from '@angular/material';
import { CustomProgressBarComponent } from './custom-progress-bar.component';

@NgModule({
    declarations: [
        CustomProgressBarComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
    ],
    exports     : [
        CustomProgressBarComponent
    ]
})
export class CustomProgressBarModule
{
}
