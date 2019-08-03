import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { Employee } from "../../models/index.models";

//Providers
import { EmployeeManagerProvider } from "../../providers/managers/employee-manager";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.page.html",
  styleUrls: ["./employee-form.page.scss"]
})
export class EmployeeFormPage implements OnInit {
  private employeeForm: FormGroup;

  public employeeToEdit: Employee;
  public indexEmployeeToEdit;

  constructor(
    private formBuilder: FormBuilder,
    private employee_manager: EmployeeManagerProvider,
    private router: Router
  ) {
    this.employeeToEdit = null;
  }

  ngOnInit() {
    var objectEmployeeToEdit = this.employee_manager.getEmployeeToEdit();
    if (objectEmployeeToEdit) {
      this.employeeToEdit = objectEmployeeToEdit.employee;
      this.indexEmployeeToEdit = objectEmployeeToEdit.index;
    }
    this.employeeForm = this.createMyForm();
  }

  private createMyForm() {
    let _employeeForm: any = {};

    _employeeForm = {
      name: [
        this.employeeToEdit ? this.employeeToEdit.name : "",
        Validators.required
      ],
      surname: [this.employeeToEdit ? this.employeeToEdit.surname : "", []],
      email: [
        this.employeeToEdit ? this.employeeToEdit.email : "",
        [
          Validators.required,
          Validators.pattern(
            /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
          )
        ]
      ]
    };
    return this.formBuilder.group(_employeeForm);
  }

  private submit() {
    if (this.employeeToEdit) {
      this.employee_manager.updateEmployee(this.indexEmployeeToEdit, {
        name: this.employeeForm.value.name,
        surname: this.employeeForm.value.surname,
        email: this.employeeForm.value.email
      });
    } else {
      this.employee_manager.addEmployee({
        name: this.employeeForm.value.name,
        surname: this.employeeForm.value.surname,
        email: this.employeeForm.value.email
      });
    }

    this.goToEmployeesPage();
  }

  goToEmployeesPage() {
    this.router.navigate(["/tabs/tabEmployees"]);
  }
}
