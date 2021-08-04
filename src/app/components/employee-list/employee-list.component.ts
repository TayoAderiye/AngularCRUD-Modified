import { Component, ComponentFactoryResolver, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { LeaveService } from 'src/app/leave.service';
import { Employee } from 'src/app/employee';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = []
  //formValue = FormGroup
  formValue!: FormGroup
  dropdown = ''
  sortingName!: string;
  gender!: string
  getId: any
  status!: string
  leaveId: any;
  detailId: any;
  myPersonalId: any;
  empIdDetails: any;
  loopingAll = [];
  employEditId: any;
  valueEdit: any;
  updateForm!: FormGroup
 // us: any;

  constructor(private api: ApiService,
    private formbuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private leave: LeaveService,
    private router: Router) {

    this.getId = this.activatedRoute.snapshot.paramMap.get('id')

    this.updateForm = this.formbuilder.group({
      userId: ['id'],
      firstName: [''],
      lastName: [''],
      email: [''],
      status: [''],
      gender: [''],
      leave: this.formbuilder.array([ ])
    })
  }


  ngOnInit(): void {
    this.getAllEmployee()
    this.formValue = this.formbuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required],
      status: ['', Validators.required]


    })
  }

  getAllEmployee(){
    this.api.getAll().subscribe((data: Employee[])=> {
      (this.employees = data)
    })
  }
  deleteEmployee(employee: any){
    this.api.delete(employee.id).subscribe(res => {
      alert("Employee Deleted")
      this.getAllEmployee()
    })
  }
  SearchByName(){
    if (this.sortingName != ""){
      this.employees = this.employees.filter(res => {
        return res.firstName.toLocaleLowerCase().match((this.sortingName.toLocaleLowerCase().trim()))
        || res.lastName.toLocaleLowerCase().match((this.sortingName.toLocaleLowerCase().trim()))

      })
    } else if (this.sortingName == ""){
      this.ngOnInit()
    }
  }
  createLeave(){
    // this.detailId = ''

    this.leave.createLeave(this.formValue.value)
    .subscribe((result: any) => {
      alert('Leave Created')
      // /console.log('abas')
    //  result.push(this.detailId.leave);
      this.detailId.leave.push(result);
      console.log(this.detailId)
      this.loopingAll = this.detailId.leave;
    })
  }
  getEmployeeId(id: any){
    // this.leaveId = id;
    // console.log(id)
    for (var i=0; i < this.employees.length; i++){
      if(this.employees[i].id === id){
        this.detailId =  this.employees[i]
        this.myPersonalId = this.detailId.id;
      }

    }

  // onEdit2(emplo: any){
  //     this.employEditId = emplo.id;
  //     this.api.get(this.employEditId).subscribe((result: any) => {
  //       this.formValue.patchValue({...result});
  //     })


  }
  onEdit2(emplo: any){
      this.employEditId = emplo.id;
      this.api.get(this.employEditId).subscribe((result: Employee) => {
        this.updateForm.patchValue({...result});
        this.valueEdit = result
        console.log('result',this.valueEdit.id)
        this.router.navigateByUrl(`/edit-employee/${this.employEditId}`)

      })
  }
















  // onInput(event: any){
  //   const target = event.target as HTMLInputElement;
  //   //this.appList = []
  //   var list : Employee[] = []
  //   console.log(this.dropdown)
  //   this.employees.forEach((item)=> {
  //     this.appList = []
  //     if (this.dropdown == null){
  //       if (item.firstName.toLocaleLowerCase().includes(target.value.toLocaleLowerCase().trim())|| item.lastName.toLocaleLowerCase().includes(target.value.toLocaleLowerCase().trim())){
  //       list.push(item)
  //       console.log(list)

  //       this.appList = list;
  //     }else if(this.dropdown != null){
  //       console.log('hi1')
  //       if ((item.firstName.toLocaleLowerCase().includes(target.value.toLocaleLowerCase().trim())||item.lastName.toLocaleLowerCase().includes(target.value.toLocaleLowerCase().trim())) && (item.status === this.dropdown)){
  //         list.push(item)
  //         console.log('hi')
  //         this.appList = list;
  //     }
  //     }
  //     }

  //   })
  //   //console.log(target.value.toLocaleLowerCase())
  //   // this.enteredText = target.value.toLocaleLowerCase()



  // }
  // selectStatus(event: any){
  //   this.dropdown = event.target.value
  //   this.employees = []
  //   //console.log(x)
  //   if (event.target.value === 'Status'){
  //     this.ngOnInit()
  //   }
  //   this.employees.forEach((item) => {
  //     console.log(this.dropdown)
  //     if(item.status === event.target.value){
  //       console.log(event.target.value)
  //       this.employees.push(item)
  //     }

  //   })
  // }
  // selectGender(event: any){

  //   this.dropdown = event.target.value
  //   if (this.dropdown != "Gender"){

  //     this.employees = this.employees.filter(res=> {
  //       return res.gender.match(this.dropdown)

  //     })
  //   // } else if (this.dropdown == "Gender" || this.dropdown ==''){
  //   //   this.ngOnInit()
  //   }
  // }
  // selGender(){
  //   //this.ngOnInit()
  //   if(this.dropdown === "Male"){

  //     this.employees = this.employees.filter(res=> {
  //       this.employees = []
  //       return res.gender.match(this.dropdown)
  //     })

  //   }else if (this.dropdown === "Female"){
  //     //this.ngOnInit()
  //     this.employees = this.employees.filter(res=> {
  //       return res.gender.match(this.dropdown)
  //     })
  //   }
  // }


}



// if (item.firstName.toLocaleLowerCase().includes(target.value.toLocaleLowerCase().trim())
//       || item.lastName.toLocaleLowerCase().includes(target.value.toLocaleLowerCase().trim())){
//         this.appList.push(item)
//       }

// SearchByName(){
//   if (this.sortingName != ""){
//     this.employees = this.employees.filter(res => {
//       return res.firstName.toLocaleLowerCase().includes((this.sortingName.toLocaleLowerCase().trim()))
//       || res.lastName.toLocaleLowerCase().includes((this.sortingName.toLocaleLowerCase().trim()))

//     })
//   } else if (this.sortingName == ""){
//     this.ngOnInit()
//   }
// }
