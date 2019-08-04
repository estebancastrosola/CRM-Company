import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Employee } from "../../models/index.models";

//Providers
import { EmployeeManagerProvider } from "../../providers/managers/employee-manager";

@Component({
  selector: "app-employee-data-form",
  templateUrl: "./employee-data-form.component.html",
  styleUrls: ["./employee-data-form.component.scss"]
})
export class EmployeeDataFormComponent implements OnInit {
  @Input() private objectEmployeeToEdit;
  @Output() private onSaveNewEmployee = new EventEmitter();
  @Output() private onUpdateEmployee = new EventEmitter();

  private employeeForm: FormGroup;

  public employeeToEdit: Employee;
  public indexEmployeeToEdit;

  constructor(
    private formBuilder: FormBuilder,
    private employee_manager: EmployeeManagerProvider
  ) {}

  ngOnInit() {
    if (this.objectEmployeeToEdit) {
      this.employeeToEdit = this.objectEmployeeToEdit.employee;
      this.indexEmployeeToEdit = this.objectEmployeeToEdit.index;
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
      let objectEmployee = {
        name: this.employeeForm.value.name,
        surname: this.employeeForm.value.surname,
        email: this.employeeForm.value.email
      };
      this.onUpdateEmployee.emit({
        indexEmployeeToEdit: this.indexEmployeeToEdit,
        objectEmployee: objectEmployee
      });
    } else {
      let objectEmployee = {
        name: this.employeeForm.value.name,
        surname: this.employeeForm.value.surname,
        email: this.employeeForm.value.email
      };
      this.onSaveNewEmployee.emit(objectEmployee);
    }
  }
}
