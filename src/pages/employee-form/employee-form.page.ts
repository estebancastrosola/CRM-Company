import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
//Providers
import { EmployeeManagerProvider } from "../../providers/managers/employee-manager";
import { Employee } from "../../models/index.models";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.page.html",
  styleUrls: ["./employee-form.page.scss"]
})
export class EmployeeFormPage implements OnInit {
  public objectEmployeeToEdit;

  constructor(
    private employee_manager: EmployeeManagerProvider,
    private router: Router
  ) {}

  ngOnInit() {
    this.objectEmployeeToEdit = this.employee_manager.getEmployeeToEdit();
  }

  private saveNewEmployee(data) {
    this.employee_manager.addEmployee(data);
    this.goToEmployeesPage();
  }
  private updateEmployee(data) {
    this.employee_manager.updateEmployee(
      data.indexEmployeeToEdit,
      data.objectEmployee
    );
    this.goToEmployeesPage();
  }

  goToEmployeesPage() {
    this.router.navigate(["/tabs/tabEmployees"]);
  }
}
