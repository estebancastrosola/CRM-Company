import { Employee} from './index.models';

export class Department{
    public id:number;
    public description:string;
    public phone:string;
    public employees:Employee[];


    constructor(object:any){
        this.id = object.id;
        this.description = object.description;
        this.phone = object.phone;
        this.employees = [];
    }

}