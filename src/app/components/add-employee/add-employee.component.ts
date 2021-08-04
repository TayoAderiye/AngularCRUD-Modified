import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Employee } from 'src/app/employee';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  formValue!: FormGroup
  constructor(private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required],
      gender: ['', Validators.required],
      leave: this.formbuilder.array([ ])

    })
  }
  onSubmit(){
    this.api.add(this.formValue.value)
    .subscribe(()=> {
      alert("Employee Added")
      //console.log(this.formValue.value)
      this.router.navigateByUrl('/employees-list')
    })
  }

}
