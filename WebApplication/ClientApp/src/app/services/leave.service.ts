import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})

  
export class LeaveService {
    constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl: string) {
  
   }

   post(leave:Leave)
   {
     const body = JSON.stringify(leave);
     console.log(body);
     return this.http.post(this.baseUrl + 'api/Leave', body, httpOptions);
   }
}

//populate properties for model
export interface Leave {
  employeeId: number,
  managerId: number,
  startDate: Date,
  endDate: Date,
  comments: string
}
