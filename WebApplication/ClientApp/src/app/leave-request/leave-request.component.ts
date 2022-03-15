import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {EmployeeService,Employee} from "../services/employee.service";
import {LeaveService} from "../services/leave.service";
import { Validators } from '@angular/forms';
import {FormBuilder,FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms'
import { AbstractControl } from '@angular/forms';
import { SnackbarService } from "../services/snackbar.service";



@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.css']
})
export class LeaveRequestComponent implements OnInit {
  employees$: Observable<Employee[]>;

  //Use reactive forms to build your form and validate inputs
  leaveForm = this.formBuilder.group({
    applicant: [null],
    manager: [null],
    startDate: [null],
    endDate: [null],
    returnDate: [null],
    numberOfDays: [0],
    generalComments: ['']
  });
  applicantLeaveForm = this.formBuilder.group({
    employeeId: [null, Validators.required],
    managerId: [null, Validators.required],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    comments: [null]
  });
  employee: any = [];

  constructor(private employeeService: EmployeeService, private leaveService: LeaveService, private formBuilder: FormBuilder, private snackbarService: SnackbarService) {}

  ngOnInit() {
    this.employeeService.getAll().subscribe(
      (data) => {
        this.employee = data;
      }
    )
  }

  selectEmployee(employee: any) {
    const employeeId = employee.source.value;
    const managerId = this.leaveForm.controls['manager'].value;
    if (managerId === employeeId) {
      this.snackbarService.openSnackbar('Applicant and manager cannot be the same person', 'Okay', 2500);
      this.leaveForm.controls['applicant'].setValue(null);
    }
  }

  selectManager(manager: any) {
    const employeeId = manager.source.value;
    const managerId = this.leaveForm.controls['applicant'].value;
    if (managerId === employeeId) {
      this.snackbarService.openSnackbar('Applicant and manager cannot be the same person', 'Okay', 2500);
      this.leaveForm.controls['manager'].setValue(null);
    }
  }

  startDateChange(event: any) {
    this.calculateNumberOfDays();
    this.validateDate('startDate');
  }

  endDateChange(event: any) {
    this.calculateNumberOfDays();
    this.validateDate('endDate');
  }

  returnDateChange(event: any) {
    this.calculateNumberOfDays();
    this.validateDate('returnDate');
  }

  validateDate(dateValue) {
    const startDate = this.leaveForm.controls['startDate'].value ? new Date(this.leaveForm.controls['startDate'].value) : null;
    const endDate = this.leaveForm.controls['endDate'].value ? new Date(this.leaveForm.controls['endDate'].value) : null;
    const returnDate = this.leaveForm.controls['returnDate'].value ? new Date(this.leaveForm.controls['returnDate'].value) : null;
    switch (dateValue) {
      case 'startDate': {
        const isValid = ((startDate > endDate && endDate) || (startDate > returnDate && returnDate) ? false : true);
        if (!isValid) {
          this.snackbarService.openSnackbar('Start date must be less than end date and return date', 'Okay', 2500);
          this.leaveForm.controls['startDate'].setValue(null);
        }
        break;
      }
      case 'endDate': {
        const isValid = ((endDate < startDate && startDate) || (endDate > returnDate && returnDate) ? false : true);
        if (!isValid) {
          this.snackbarService.openSnackbar('End date must be less than return date and greater than start date', 'Okay', 2500);
          this.leaveForm.controls['endDate'].setValue(null);
        }
        break;
      }
      case 'returnDate': {
        const isValid = ((returnDate < startDate && startDate) || (returnDate < endDate && endDate) ? false : true);
        if (!isValid) {
          this.snackbarService.openSnackbar('Return date must be greater than start date and end date', 'Okay', 2500)
          this.leaveForm.controls['returnDate'].setValue(null);
        }
        break;
      }
    }
  }

  calculateNumberOfDays() {
    const startDate = new Date(this.leaveForm.controls['startDate'].value);
    const endDate = new Date(this.leaveForm.controls['endDate'].value);
    const timeValue = endDate.getTime() - startDate.getTime();
    const ms = (1000 * 3600 * 24) // get ms for easier calc
    const numberOfDays = timeValue / ms;
    this.leaveForm.controls['numberOfDays'].setValue((numberOfDays > 0 ? Math.floor(numberOfDays) : 0));
  }

  submitLeave() {
    const leaveData = this.leaveForm.value;
    this.applicantLeaveForm.controls['employeeId'].setValue(leaveData.applicant);
    this.applicantLeaveForm.controls['managerId'].setValue(leaveData.manager);
    this.applicantLeaveForm.controls['startDate'].setValue(leaveData.startDate);
    this.applicantLeaveForm.controls['endDate'].setValue(leaveData.endDate);
    this.applicantLeaveForm.controls['comments'].setValue(leaveData.generalComments);
    if (this.applicantLeaveForm.valid) {
      this.leaveService.post(this.applicantLeaveForm.value).subscribe(
        (data) => {
          this.snackbarService.openSnackbar('Leave submitted successfully.', 'Okay', 2500);
          this.leaveForm.reset();
        }
      );
    } else {
      this.snackbarService.openSnackbar('Some field(s) are invalid.', 'Okay', 2500);
    }
  }

  cancelApplication() {
    this.leaveForm.reset();
    this.snackbarService.openSnackbar('Form resetted', 'Okay', 2500);
  }
 


}
