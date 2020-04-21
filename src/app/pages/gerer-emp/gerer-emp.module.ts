import { GererEmpComponent } from './gerer-emp.component';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

export const routes = [
    { path: '', component: GererEmpComponent, pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [
      CommonModule, 
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule,
      MultiselectDropdownModule,
      NgxPaginationModule,
      PipesModule,
      RouterModule.forChild(routes)
    ],
    declarations: [
      GererEmpComponent
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  export class GererEmpModule { }
  