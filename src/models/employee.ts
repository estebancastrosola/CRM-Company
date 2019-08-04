export class Employee {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;

  constructor(object: any) {
    this.id = object.id;
    this.name = object.name;
    this.surname = object.surname;
    this.email = object.email;
  }

  public getCompletName() {
    return this.name + " " + (this.surname ? this.surname : "");
  }
}
