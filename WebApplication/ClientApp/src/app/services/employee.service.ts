import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl: string) {

  }

  getAll() {
    console.log(this.baseUrl);
    return this.http.get(this.baseUrl + 'api/Employee');
   
  }
}

//populate properties for model
export interface Employee {
  employeeId: number,
  name: string
}
