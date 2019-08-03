import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

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

  loadingDepartments$: Observable<boolean>;
  public loadingDepartments: boolean;

  constructor(
    private department_manager: DepartmentManagerProvider,
    private employee_manager: EmployeeManagerProvider,
    private router: Router
  ) {
    this.departments = [];
    this.loadingDepartments = false;
  }

  ngOnInit() {
    this.departments$ = this.department_manager.getDepartments$();
    this.departments$.subscribe(
      departments => (this.departments = departments)
    );

    this.loadingDepartments$ = this.department_manager.getLoadingDepartments$();
    this.loadingDepartments$.subscribe(
      loadingDepartments => (this.loadingDepartments = loadingDepartments)
    );

    this.department_manager.loadDepartments();
  }

  loadEmployeesByDepartment(departmentIndex) {
    this.employee_manager.loadEmployeesByDepartment(
      this.departments[departmentIndex].employees,
      this.departments[departmentIndex].description
    );
    this.goToEmployeesPage();
  }

  goToEmployeesPage() {
    this.router.navigate(["/tabs/tabEmployees"]);
  }

  addDepartment() {
    this.department_manager.addDepartment(
      new Department({
        id: this.departments.length + 1,
        description: "Department " + (this.departments.length + 1),
        phone: "9XXXXXXXX"
      })
    );
  }
}
