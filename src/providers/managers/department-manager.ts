import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

import { Department } from '../../models/index.models';

@Injectable()
export class DepartmentManagerProvider {

    public departments: Department[];
    private departments$ = new Subject<Department[]>();

    constructor() {
        this.departments = [];
    }

    getDepartments$(): Observable<Department[]> {
        return this.departments$.asObservable();
    }

    public addDepartment(department: Department) {
        this.departments.push(department);
        this.departments$.next(this.departments);
    }

}