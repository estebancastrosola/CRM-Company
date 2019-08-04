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

  public resultsBySeach: boolean;
  public resultsBySeach$ = new Subject<boolean>();

  public employeeToEdit;

  constructor(
    private loading_controller: LoadingController,
    private toastController: ToastController
  ) {
    this.employees = [];
    this.currentDepartment = "";
    this.loadingEmployees = false;
    this.employeeToEdit = null;
    this.resultsBySeach = false;
  }

  async loadEmployees() {
    this.cleanEmloyees();
    this.setCurrentDepartment("");
    this.setResultsBySearch(false);
    this.setLoadingEmployees(true);

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
    this.setLoadingEmployees(false);
  }

  async loadEmployeesByDepartment(employees, department) {
    const loading = await this.loading_controller.create({
      message: "Searching..."
    });
    await loading.present();

    this.setLoadingEmployees(true);
    this.setResultsBySearch(false);

    this.employees = employees;
    this.employees$.next(this.employees);
    this.setCurrentDepartment(department);

    await loading.dismiss();

    this.setLoadingEmployees(false);
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

  public async addEmployee(employeeObject) {
    const loading = await this.loading_controller.create({
      message: "Loading"
    });
    await loading.present();

    let employee = new Employee({
      id: this.employees.length + 1,
      name: employeeObject.name,
      surname: employeeObject.surname,
      email: employeeObject.email
    });
    this.employees.push(employee);
    this.employees$.next(this.employees);

    await loading.dismiss();

    const toast = await this.toastController.create({
      message: "The employee has been successfully created.",
      duration: 2000,
      color: "success"
    });
    toast.present();
  }

  async updateEmployee(index, employee) {
    const loading = await this.loading_controller.create({
      message: "Saving..."
    });
    await loading.present();

    let currentEmployeeToEdit = this.employees[index];
    currentEmployeeToEdit.name = employee.name;
    currentEmployeeToEdit.surname = employee.surname;
    currentEmployeeToEdit.email = employee.email;
    this.employees[index] = currentEmployeeToEdit;
    this.employees$.next(this.employees);

    await loading.dismiss();

    const toast = await this.toastController.create({
      message: "The employee has been successfully edited.",
      duration: 2000,
      color: "success"
    });
    toast.present();
  }

  async searchEmployeesByIncorporationDate(incorporationDate) {
    this.cleanEmloyees();
    this.setCurrentDepartment("");
    this.setLoadingEmployees(true);

    this.setResultsBySearch(true);

    const loading = await this.loading_controller.create({
      message: "Searching..."
    });
    await loading.present();

    let response = await fetch("http://localhost:3000/search");
    let json = await response.json();
    json.map(data => {
      this.employees.push(data);
      this.employees$.next(this.employees);
    });

    await loading.dismiss();

    this.setLoadingEmployees(false);
  }

  getEmployees$(): Observable<Employee[]> {
    return this.employees$.asObservable();
  }

  cleanEmloyees() {
    this.employees = [];
    this.employees$.next(this.employees);
  }

  setCurrentDepartment(currentDepartment) {
    this.currentDepartment = currentDepartment;
    this.currentDepartment$.next(this.currentDepartment);
  }

  getCurrentDepartment$(): Observable<string> {
    return this.currentDepartment$.asObservable();
  }

  getLoadingEmployees$(): Observable<boolean> {
    return this.loadingEmployees$.asObservable();
  }

  setLoadingEmployees(loadingEmployees) {
    this.loadingEmployees = loadingEmployees;
    this.loadingEmployees$.next(this.loadingEmployees);
  }

  setResultsBySearch(resultBySearch) {
    this.resultsBySeach = resultBySearch;
    this.resultsBySeach$.next(this.resultsBySeach);
  }

  getResultsBySearch$(): Observable<boolean> {
    return this.resultsBySeach$.asObservable();
  }

  setEmployeeToEdit(index) {
    this.employeeToEdit = {
      employee: this.employees[index],
      index: index
    };
  }

  getEmployeeToEdit() {
    return this.employeeToEdit;
  }

  cleanEmployeeToEdit() {
    this.employeeToEdit = null;
  }
}
