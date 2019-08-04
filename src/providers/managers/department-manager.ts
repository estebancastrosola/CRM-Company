import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";

import { Observable } from "rxjs";
import { Subject } from "rxjs";

import { Department } from "../../models/index.models";

@Injectable()
export class DepartmentManagerProvider {
  public departments: Department[];
  private departments$ = new Subject<Department[]>();

  public loadingDepartments: boolean;
  public loadingDepartments$ = new Subject<boolean>();

  constructor(private loading_controller: LoadingController) {
    this.departments = [];
  }

  async loadDepartments() {
    this.setLoadingDepartments(true);
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
    this.setLoadingDepartments(false);
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

  setLoadingDepartments(loadingDepartments) {
    this.loadingDepartments = loadingDepartments;
    this.loadingDepartments$.next(this.loadingDepartments);
  }

  getLoadingDepartments$(): Observable<boolean> {
    return this.loadingDepartments$.asObservable();
  }
}
