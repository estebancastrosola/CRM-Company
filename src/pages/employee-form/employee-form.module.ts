import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EmployeeFormPage } from './employee-form.page';

import {EmployeeDataFormComponent} from '../../components/employee-data-form/employee-data-form.component'

const routes: Routes = [
  {
    path: '',
    component: EmployeeFormPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [EmployeeDataFormComponent],
  declarations: [EmployeeFormPage, EmployeeDataFormComponent]
})
export class EmployeeFormPageModule {}
