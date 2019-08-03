import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

import { Observable } from "rxjs";
import { Subject } from "rxjs";

import { Employee } from "../../models/index.models";

@Injectable()
export class EmployeeManagerProvider {
  public currentDepartment : string;
  public currentDepartment$ = new Subject<string>();

  public employees: Employee[];
  private employees$ = new Subject<Employee[]>();

  constructor(private loading_controller: LoadingController) {
    this.employees = [];
    this.currentDepartment = "";
  }

  async loadEmployees() 
  {
    this.cleanEmloyees();
    this.cleanCurrentDepartment();
    this.employees$.next(this.employees);
    const loading = await this.loading_controller.create({
      message: "Loading"
    });
    await loading.present();

    let response = await fetch("http://localhost:3000/employees");
    let json = await response.json();
    json.map(data => {
      this.employees.push(data);
      this.employees$.next(this.employees);
    });

    await loading.dismiss();
  }

  loadEmployeesByDepartment(employees, department){
    this.employees = employees;
    this.employees$.next(this.employees);
    this.currentDepartment = department;
    this.currentDepartment$.next(this.currentDepartment);

  }

  getEmployees$(): Observable<Employee[]> {
    return this.employees$.asObservable();
  }

  cleanEmloyees(){
    this.employees = [];
    this.employees$.next(this.employees);
  }

  getCurrentDepartment$(): Observable<string> {
    return this.currentDepartment$.asObservable();
  }

  cleanCurrentDepartment(){
    this.currentDepartment = "";
    this.currentDepartment$.next(this.currentDepartment);
  }

  public async addEmployee(employee: Employee) {
    const loading = await this.loading_controller.create({
      message: "Loading"
    });
    await loading.present();

    this.employees.push(employee);
    this.employees$.next(this.employees);

    await loading.dismiss();
  }
}
