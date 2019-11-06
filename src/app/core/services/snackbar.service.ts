import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  config = new MatSnackBarConfig();

  constructor(public snackbar: MatSnackBar, private zone: NgZone) {
    this.config.duration = 3000;
    this.config.verticalPosition = 'top';
    this.config.horizontalPosition = 'right';
  }

  successful(message: string) {
    this.config.panelClass = [];
    this.zone.run(() => this.snackbar.open(message, 'x', this.config));
  }

  error(message: string) {
    this.config.panelClass = ['background-red'];
    this.zone.run(() => this.snackbar.open(message, 'x', this.config));
  }
}
