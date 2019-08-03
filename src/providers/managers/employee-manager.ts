import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { ToastController } from "@ionic/angular";

import { Observable } from "rxjs";
import { Subject } from "rxjs";

import { Employee } from "../../models/index.models";

@Injectable()
export class EmployeeManagerProvider {
  public currentDepartment: string;
  public currentDepartment$ = new Subject<string>();

  public loadingEmployees: boolean;
  public loadingEmployees$ = new Subject<boolean>();

  public employees: Employee[];
  private employees$ = new Subject<Employee[]>();

  constructor(
    private loading_controller: LoadingController,
    private toastController: ToastController
  ) {
    this.employees = [];
    this.currentDepartment = "";
    this.loadingEmployees = false;
  }

  async loadEmployees() {
    this.cleanEmloyees();
    this.cleanCurrentDepartment();
    this.loadingEmployees = true;
    this.loadingEmployees$.next(this.loadingEmployees);
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
    this.loadingEmployees = false;
    this.loadingEmployees$.next(this.loadingEmployees);
  }

  loadEmployeesByDepartment(employees, department) {
    this.employees = employees;
    this.employees$.next(this.employees);
    this.currentDepartment = department;
    this.currentDepartment$.next(this.currentDepartment);
  }

  async deleteEmployee(index) {
    const loading = await this.loading_controller.create({
      message: "Removing..."
    });
    await loading.present();

    this.employees.splice(index, 1);
    this.employees$.next(this.employees);

    await loading.dismiss();

    const toast = await this.toastController.create({
      message: "The employee has been successfully removed.",
      duration: 2000,
      color: "success"
    });
    toast.present();
  }

  getEmployees$(): Observable<Employee[]> {
    return this.employees$.asObservable();
  }

  cleanEmloyees() {
    this.employees = [];
    this.employees$.next(this.employees);
  }

  getCurrentDepartment$(): Observable<string> {
    return this.currentDepartment$.asObservable();
  }

  getLoadingEmployees$(): Observable<boolean> {
    return this.loadingEmployees$.asObservable();
  }

  cleanCurrentDepartment() {
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
