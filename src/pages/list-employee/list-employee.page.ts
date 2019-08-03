import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

//Providers
import { EmployeeManagerProvider } from "./../../providers/managers/employee-manager";

//Models
import { Employee } from "../../models/index.models";

@Component({
  selector: "app-list-employee",
  templateUrl: "./list-employee.page.html",
  styleUrls: ["./list-employee.page.scss"]
})
export class ListEmployeePage implements OnInit {
  employees$: Observable<Employee[]>;
  public employees: Employee[];

  currentDepartment$: Observable<string>;
  public currentDepartment: string;

  loadingEmployees$: Observable<boolean>;
  public loadingEmployees: boolean;

  constructor(
    private employee_manager: EmployeeManagerProvider,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.employees$ = this.employee_manager.getEmployees$();
    this.employees$.subscribe(employees => (this.employees = employees));

    this.currentDepartment$ = this.employee_manager.getCurrentDepartment$();
    this.currentDepartment$.subscribe(
      currentDepartment => (this.currentDepartment = currentDepartment)
    );

    this.loadingEmployees$ = this.employee_manager.getLoadingEmployees$();
    this.loadingEmployees$.subscribe(loadingEmployees => (this.loadingEmployees = loadingEmployees));
    
    this.employee_manager.loadEmployees();
  }

  loadAllEmployees() {
    this.employee_manager.loadEmployees();
  }

  async deleteEmployee(index) {
    const alert = await this.alertController.create({
      message:
        "<strong>Are you sure you want to delete this employee?</strong>",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary"
        },
        {
          text: "Sure",
          handler: () => {
            this.employee_manager.deleteEmployee(index);
          }
        }
      ]
    });

    await alert.present();
  }

  addEmployee() {
    this.employee_manager.addEmployee(
      new Employee({
        id: "1",
        name: "Esteban",
        surname: "Castro",
        email: "esteban@gmail.com"
      })
    );
  }
}
