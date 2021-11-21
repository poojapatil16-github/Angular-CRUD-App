import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { EmployeModel } from './employeDashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeModelObj : EmployeModel = new EmployeModel();
  employeData !: any;
  showAdd !: boolean;
  showupdate! : boolean;
  constructor(
    private formbuilder : FormBuilder,
    private api : ApiService
    ) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      fullName : [''],
      email : [''],
      mobile : [''],
      salary : ['']
    })
    this.getAllEmploye();
  }

  clickAddEmploye(){
    this.formValue.reset();
    this.showAdd = true;
    this.showupdate = false;
  }

  postEmployeDetails(){
    this.employeModelObj.fullName = this.formValue.value.fullName;
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.mobile = this.formValue.value.mobile;
    this.employeModelObj.salary = this.formValue.value.salary;

    this.api.postEmployee(this.employeModelObj).subscribe(res =>{
      alert("Employe Added succesfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmploye();

    },
    err=> {
      alert("Something went wrong");
    })
  }

  getAllEmploye(){
    this.api.getEmployee().subscribe(res=>{
      this.employeData = res;
    })
  }

  deleteEmploye(row : any){
    this.api.deleteEmployee(row.id)
    .subscribe(res => {
      alert("Employe Deleted")
      this.getAllEmploye();
    })
  }

  onEdit(row : any){
    this.showAdd = true;
    this.showupdate = false;
    this.employeModelObj.id = row.id;
    this.formValue.controls['fullName'].setValue(row.fullName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobile'].setValue(row.mobile)
    this.formValue.controls['salary'].setValue(row.salary)
  }

  updateEmployeDetails(){
    this.employeModelObj.fullName = this.formValue.value.fullName;
    this.employeModelObj.email = this.formValue.value.email;
    this.employeModelObj.mobile = this.formValue.value.mobile;
    this.employeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeModelObj,this.employeModelObj.id).subscribe(res =>{
      alert("Employe Update succesfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmploye();
    },
    err=> {
      alert("Something went wrong");
    })
  }
}
