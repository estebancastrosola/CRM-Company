import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

//Providers
import { DepartmentManagerProvider } from './../../providers/managers/department-manager';

//Models
import { Department } from '../../models/index.models';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.page.html',
  styleUrls: ['./list-department.page.scss'],
})
export class ListDepartmentPage implements OnInit {

  departments$: Observable<Department[]>;
  public departments: Department[];

  constructor(
    private department_manager: DepartmentManagerProvider,
  ) { }

  ngOnInit() {
    this.departments$ = this.department_manager.getDepartments$();
    this.departments$.subscribe(departments => this.departments = departments);

    this.department_manager.addDepartment(new Department({
      id:"1",
      description: "Departamento 1",
      phone:"697878787"
    }));
  }

  addDepartment(){
    this.department_manager.addDepartment(new Department({
      id:"1",
      description: "Departamento 1",
      phone:"697878787"
    }));
  }

}
