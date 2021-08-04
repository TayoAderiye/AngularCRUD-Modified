import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/api.service';
import { LeaveService } from 'src/app/leave.service';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  getId: any
  updateForm!: FormGroup
  formValue!: FormGroup
  detailId: any;
  loopingAll: any;
  employees: Employee[] = []
  myPersonalId: any;
  theId: any;
  updateEmployee : Employee[] = [];
  pushedLeave: any;
  gottenEmp: any;
  newLeave: any
  leaveShow!: false
  loopingAllValue: any;
  getIdd: any;
  currentEmpl:any = [];
  showViewLeave = false
  filledLeave = false
  emptyLeave = false

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private leave: LeaveService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')


    this.api.get(this.getId).subscribe(res => {
      this.updateForm.setValue({
        userId: res['id'],
        firstName: res['firstName'],
        lastName: res['lastName'],
        email: res['email'],
        status: res['status'],
        gender: res['gender'],
        leave: res['leave']
      });
    })
    this.updateForm = this.formBuilder.group({
      userId: ['id'],
      firstName: [''],
      lastName: [''],
      email: [''],
      status: [''],
      gender: [''],
      leave: ['']
      // leave: this.formBuilder.array([])

    })


  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required],
      reason: ['', Validators.required],
      status: ['', Validators.required]


    })
    //this.getId
    //this.getLeaveOfEmployee()
    // this.getUserById()
  }
  onUpdate(): any {
    this.api.update(this.updateForm.value, this.getId)
    .subscribe(() => {
      alert("Data Updated succesfully")
      this.router.navigateByUrl('/employees-list')
    }, (err) => {
      console.log(err);
  })
  }

  createLeavee(){
    this.api.get(this.updateForm.value.userId).subscribe((result: any)=>{
      this.gottenEmp = result
      console.log('gotten',this.gottenEmp)

      // this.gottenEmp.leave.push(this.newLeave)
      // console.log('update', this.gottenEmp)
      // this.gottenEmp.leave.push(this.newLeave)
      // this.api.update(this.newLeave, this.gottenEmp.id).subscribe((res)=> {
      //   console.log(res)
      // })
    })
    this.leave.createLeave(this.formValue.value).subscribe((res)=> {
      this.newLeave = res
      alert("Leave Added")
      this.formValue.reset()
      // this.router.navigateByUrl(`/edit-employee/${this.gottenEmp.userId}`)
      // this.router.navigateByUrl('/')
      console.log('created', this.newLeave)
      this.updateForm.value.leave.push(this.newLeave)
    console.log('update', this.gottenEmp)
    this.api.update(this.updateForm.value, this.updateForm.value.userId).subscribe((res)=> {

      (this.loopingAll = res)
      // console.log('leave',this.loopingAll.leave)
      // this.loopingAllValue = this.loopingAll.leave

    })

    })

  }
  getLeaveOfEmployee(){
    this.api.get(this.updateForm.value.userId).subscribe((res)=> {
      this.showViewLeave = true
      this.currentEmpl = res.leave
      this.filledLeave = true
      this.emptyLeave = false
      if(this.currentEmpl.length == 0){
        alert('No leave found')
      }
      this.currentEmpl

      console.log('rerer',this.currentEmpl)
    })
  }
  closeLeave(){
    this.filledLeave = false
    this.emptyLeave = true
  }
  getEmployeeId(){
    //console.log(this.theId)
    // this.leaveId = id;
    // console.log(id)
    // this.api.get(this.theId).subscribe((result : any) =>{
    //   this.detailId = result
    //   console.log('the value of selected list', result)
    //   // console.log(Array.isArray(this.detailId.leave))
    // })
    // this.api.get(this.updateForm.value.userId).subscribe((result : any) =>{
    //   this.detailId = result
    //   console.log('the value of selected list', this.detailId)
    //   // console.log(Array.isArray(this.detailId.leave))
    // })

    console.log('the value of selected list', this.updateForm.value.userId)





  }


}


  // createLeave(){
  //   // this.detailId = ''

  //   this.leave.createLeave(this.formValue.value)
  //   .subscribe((result: any) => {
  //     // console.log('rs', result)
  //     alert('Leave Created')
  //     console.log('leave created', result)
  //     console.log('idd',this.detailId.id)

  //     // this.api.get(this.detailId.id).subscribe((result: any) => {
  //     //    this.updateEmployee = result
  //     //   console.log(this.updateEmployee)
  //     // })
  //     this.detailId.leave.push(result)
  //     console.log('after data has been pushed',this.detailId.leave)
  //     // console.log('form',this.updateForm.value.leave)
  //     this.api.update(this.updateForm.value, this.detailId.id).subscribe((res)=> {
  //      return  res
  //       console.log('llasst',res)
  //     })
  //     // console.log(result)
  //     // // this.updateEmployee = result
  //     //  this.detailId.leave.push(result)
  //     //  this.updateEmployee = this.detailId.leave
  //     // console.log('sdsdsdsd',this.detailId.leave)

  //     // this.api.update(this.formValue.value.leave , this.detailId.id).subscribe((result)=> {
  //     //   return result
  //     // })

  //   //   this.api.update(this.updateEmployee, this.updateEmployee.id).subscribe((result: any)=> {
  //   //     console.log(result)
  //   //   })
  //   //   this.formValue.reset()

  //   //  result.push(this.detailId.leave);


  //     //Access that employee/
  //     // this.api.get(this.updateEmployee.id).subscribe((result : any) =>{
  //     //   this.updateEmployee = result
  //     //   console.log(this.updateEmployee)
  //     //   // console.log('adffa',this.updateEmployee.id)
  //     // })
  //     // // //updatedemployee = employee.leaves.push(leave)
  //     // this.api.update(this.updateEmployee,this.updateEmployee.id).subscribe((result: any)=> {
  //     //   return result
  //     // })
  //     // //this.app.update(id, updatedemployee)
  //     // //console.log(this.detailId)
  //     // this.loopingAll = this.detailId.leave;
  //     //console.log('checking', this.loopingAll)
  //   })
  // }
