import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

import { Observable } from "rxjs";
import { Subject } from "rxjs";

import { Department } from "../../models/index.models";

@Injectable()
export class DepartmentManagerProvider {
  public departments: Department[];
  private departments$ = new Subject<Department[]>();

  constructor(private loading_controller: LoadingController) {
    this.departments = [];
  }

  async loadDepartments() {
    const loading = await this.loading_controller.create({
      message: "Loading"
    });
    await loading.present();

    let response = await fetch("http://localhost:3000/departments");
    let json = await response.json();
    json.map(data => {
      this.departments.push(data);
      this.departments$.next(this.departments);
    });

    await loading.dismiss();
  }

  getDepartments$(): Observable<Department[]> {
    return this.departments$.asObservable();
  }

  public async addDepartment(department: Department) {
    const loading = await this.loading_controller.create({
      message: "Loading"
    });
    await loading.present();

    this.departments.push(department);
    this.departments$.next(this.departments);

    await loading.dismiss();
  }
}
