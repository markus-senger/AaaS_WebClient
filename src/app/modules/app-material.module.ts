import { NgModule } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    exports: [
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDatepickerModule,
        MatAutocompleteModule
    ]
})
  
export class AppMaterialModule { }