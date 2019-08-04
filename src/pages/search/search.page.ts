import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

//Providers
import { EmployeeManagerProvider } from "../../providers/managers/employee-manager";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"]
})
export class SearchPage implements OnInit {
  private searchForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private employee_manager: EmployeeManagerProvider,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchForm = this.createMyForm();
  }

  private createMyForm() {
    let searchForm: any = {};

    searchForm = {
      date: ["", Validators.required]
    };
    return this.formBuilder.group(searchForm);
  }

  submit() {
    this.employee_manager.searchEmployeesByIncorporationDate(
      this.searchForm.value.date
    ),
      this.goToEmployeesPage();
  }

  goToEmployeesPage() {
    this.router.navigate(["/tabs/tabEmployees"]);
  }
}
