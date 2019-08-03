import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "tabEmployees",
        loadChildren:
          "../list-employee/list-employee.module#ListEmployeePageModule"
      },
      {
        path: "tabDepartments",
        loadChildren:
          "../list-department/list-department.module#ListDepartmentPageModule"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/tabEmployees",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
