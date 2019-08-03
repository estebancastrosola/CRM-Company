import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: '../pages/tabs/tabs.module#TabsPageModule' },
  //{ path: 'list-department', loadChildren: '../pages/list-department/list-department.module#ListDepartmentPageModule' },
  //{ path: 'list-employee', loadChildren: '../pages/list-employee/list-employee.module#ListEmployeePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
