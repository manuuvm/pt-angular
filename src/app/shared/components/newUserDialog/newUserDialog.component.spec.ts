import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { async, getTestBed, TestBed, ComponentFixture } from '@angular/core/testing';
import { SnackbarService, UserService } from 'src/app/core/services';
import { NewUserDialogComponent } from './newUserDialog.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../module/material';
import { SpinnerModule } from '../../module/spinner';
import { MatToolbarModule, MatButtonModule, MatButtonToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { HAMMER_LOADER } from '@angular/platform-browser';

describe('newUserDialog', () => {
  let component: NewUserDialogComponent;
  let injector: Injector;
  let userService: UserService;
  let snackbarService: SnackbarService;
  let translateService: TranslateService;
  let fixture: ComponentFixture<NewUserDialogComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({}),
        MatDialogModule,
        FormsModule,
        MaterialModule,
        SpinnerModule,
        MatToolbarModule,
        MatButtonModule,
        MatButtonToggleModule,
        ReactiveFormsModule,
      ],
      declarations: [
        NewUserDialogComponent
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { })
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: () => { }
          }
        },
        SnackbarService,
        UserService,
        TranslateService
      ]
    }).compileComponents();

    injector = getTestBed();
    userService = injector.get(UserService);
    snackbarService = injector.get(SnackbarService);
    translateService = injector.get(TranslateService);

    fixture = TestBed.createComponent(NewUserDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  }));

  it('ngOnInit', () => {
    // Assert
    expect(component.dialogRef.disableClose).toBeTruthy();
    expect(component.newUserEditionForm).toBeTruthy();
  });

  it('onSave should be undefined if there are errors', () => {
    // Act
    component.newUserEditionForm.get('name').setErrors({ error: 'error' })
    const result = component.onSave();

    // Assert
    expect(result).toBeUndefined();
  });

  it('onSave', () => {
    // Arrange
    const name = 'test';
    const birthdate = new Date();
    const newUserCreated = true;
    const spyTranslateServiceGet = jest.spyOn(translateService, 'get').mockReturnValue(of('test'));
    const spyUserServiceNewUser = jest.spyOn(userService, 'newUser').mockReturnValue(of({ name, birthdate, id: 1 }));
    const spySnackbarServiceSuccessful = jest.spyOn(snackbarService, 'successful');
    const spyDialogRefClose = jest.spyOn(component.dialogRef, 'close');

    // Act
    component.newUserEditionForm.setErrors(null);
    component.newUserEditionForm.controls.name.setValue(name);
    component.newUserEditionForm.controls.birthdate.setValue(birthdate);

    component.onSave();
    fixture.detectChanges(true);

    // Assert
    expect(spyUserServiceNewUser).toHaveBeenCalledWith({ name, birthdate });
    expect(spyTranslateServiceGet).toHaveBeenCalledWith('NEW_USER_DIALOG.USER_CREATED_SUCCESSFULLY');
    expect(spySnackbarServiceSuccessful).toHaveBeenCalled();
    expect(spyDialogRefClose).toHaveBeenCalledWith({ newUserCreated });
  });

  it('onCancel', () => {
    // Arrange
    const spyDialogRefClose = jest.spyOn(component.dialogRef, 'close');
    const newUserCreated = false;

    // Act
    component.onCancel();
    fixture.detectChanges(true);

    // Assert
    expect(spyDialogRefClose).toHaveBeenCalledWith({ newUserCreated });
  });
});
