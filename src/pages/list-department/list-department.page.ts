import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

//Providers
import { DepartmentManagerProvider } from "./../../providers/managers/department-manager";
import { EmployeeManagerProvider } from "./../../providers/managers/employee-manager";

//Models
import { Department } from "../../models/index.models";

@Component({
  selector: "app-list-department",
  templateUrl: "./list-department.page.html",
  styleUrls: ["./list-department.page.scss"]
})
export class ListDepartmentPage implements OnInit {
  departments$: Observable<Department[]>;
  public departments: Department[];

  constructor(
    private department_manager: DepartmentManagerProvider,
    private employee_manager: EmployeeManagerProvider,
    private router: Router,
    ) {}

  ngOnInit() {
    this.departments$ = this.department_manager.getDepartments$();
    this.departments$.subscribe(
      departments => (this.departments = departments)
    );
    this.department_manager.loadDepartments();
  }

  loadEmployeesByDepartment(departmentIndex){
    this.employee_manager.loadEmployeesByDepartment(this.departments[departmentIndex].employees);
    this.goToEmployeesPage();
  }

  goToEmployeesPage(){
    this.router.navigate(['/list-employee'])
  }

  addDepartment() {
    this.department_manager.addDepartment(
      new Department({
        id: "1",
        description: "Departamento 1",
        phone: "697878787"
      })
    );
  }

  ngOnDestroy(){
    console.log("me destruyo")
  }
}
