import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

//Providers
import { EmployeeManagerProvider } from './../../providers/managers/employee-manager';

//Models
import { Employee } from '../../models/index.models';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.page.html',
  styleUrls: ['./list-employee.page.scss'],
})
export class ListEmployeePage implements OnInit {
  employees$: Observable<Employee[]>;
  public employees: Employee[];

  constructor(
    private employee_manager: EmployeeManagerProvider,
  ) { }

  ngOnInit() {
    this.employees$ = this.employee_manager.getEmployees$();
    this.employees$.subscribe(employees => this.employees = employees);
    this.employee_manager.loadEmployees();
  }

  addEmployee(){
    this.employee_manager.addEmployee(new Employee({
      id:"1",
      name: "Esteban",
      surname:"Castro",
      email: "esteban@gmail.com"
    }));
  }

}
