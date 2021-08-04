import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Leave } from './leave';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:5000/leave'
  constructor(private http: HttpClient) { }

  createLeave(data: any){
    // const url = `${this.apiUrl}/${id}`
    return this.http.post<Leave>(this.apiUrl, data)
  }
}
