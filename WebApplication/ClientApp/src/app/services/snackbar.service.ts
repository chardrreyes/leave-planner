import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})


export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {

  }

  openSnackbar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, { duration: duration });
  }
}
