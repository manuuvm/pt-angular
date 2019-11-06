import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService, UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/model';

@Component({
  selector: 'user-edition-page',
  templateUrl: './userEdition.component.html',
  styleUrls: ['./userEdition.component.scss']
})
export class UserEditionComponent implements OnInit {
  userEditionForm: FormGroup;
  maxDate = new Date();

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.userEditionForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      birthdate: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.getUserById(+id);
      }
    });
  }

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.userEditionForm.setValue(user);
    })
  }

  updateUserById(): void {
    if (
      this.userEditionForm.get('id').errors ||
      this.userEditionForm.get('name').errors ||
      this.userEditionForm.get('birthdate').errors
    ) {
      return;
    }

    const user: User = {
      id: this.userEditionForm.controls.id.value,
      name: this.userEditionForm.controls.name.value,
      birthdate: this.userEditionForm.controls.birthdate.value,
    }

    this.userService.updateUser(user).subscribe(() => {
      this.translateService.get('USER_EDITION.USER_MODIFIED_SUCCESSFULLY').subscribe((translate) => {
        this.snackbarService.successful(translate)
      })
    })
  }
}
