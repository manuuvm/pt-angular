import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService, UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/model';

@Component({
  selector: 'new-user-dialog',
  templateUrl: './newUserDialog.component.html',
  styleUrls: ['./newUserDialog.component.scss']
})
export class NewUserDialogComponent implements OnInit {
  newUserEditionForm: FormGroup;
  maxDate = new Date();

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<NewUserDialogComponent>,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.newUserEditionForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthdate: [new Date, Validators.required]
    });
  }

  onSave(): void {
    if (this.newUserEditionForm.get('name').errors || this.newUserEditionForm.get('name').hasError('')) {
      return;
    }

    const newUser: Omit<User, 'id'> = {
      name: this.newUserEditionForm.controls.name.value,
      birthdate: this.newUserEditionForm.controls.birthdate.value,
    }

    this.userService.newUser(newUser).subscribe(() => {
      this.translateService.get('NEW_USER_DIALOG.USER_CREATED_SUCCESSFULLY').subscribe((translatedMessage) => {
        this.snackbarService.successful(translatedMessage);
      });

      this.dialogRef.close({ newUserCreated: true });
    })
  }

  onCancel(): void {
    this.dialogRef.close({ newUserCreated: false });
  }
}
