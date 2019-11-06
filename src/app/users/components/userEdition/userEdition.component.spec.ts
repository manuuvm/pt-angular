import { Injector } from '@angular/core';
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SnackbarService, UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/model';
import { MaterialModule } from 'src/app/shared/module/material';
import { SharedModule } from 'src/app/shared/module/shared';
import { SpinnerModule } from 'src/app/shared/module/spinner';
import { UserEditionComponent } from './userEdition.component';
import { HAMMER_LOADER } from '@angular/platform-browser';

describe('UserEditionComponent', () => {
  let component: UserEditionComponent;
  let snackbarService: SnackbarService;
  let userService: UserService;
  let translateService: TranslateService;
  let injector: Injector;
  let fixture: ComponentFixture<UserEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        MaterialModule,
        SpinnerModule,
        TranslateModule.forRoot({}),
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [UserEditionComponent],
      providers: [
        SnackbarService,
        UserService,
        TranslateService,
        FormBuilder,
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { })
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: jest.fn(() => 1) })
          }
        }
      ],
    }).compileComponents();

    injector = getTestBed();
    translateService = injector.get(TranslateService);
    userService = injector.get(UserService);
    snackbarService = injector.get(SnackbarService);

    fixture = TestBed.createComponent(UserEditionComponent);
    component = fixture.componentInstance;
  }));

  it('ngOnInit', () => {
    // Arrange
    const spyGetUserById = jest.spyOn(userService, 'getUserById');

    // Act
    component.ngOnInit();

    // Assert
    expect(spyGetUserById).toHaveBeenCalledWith(1);
  });

  it('getUserById', () => {
    // Arrange
    const userId = 1;
    const mockUser: User = { birthdate: new Date(), id: 1, name: 'test' };
    const spyGetUserById = jest.spyOn(userService, 'getUserById').mockReturnValue(of(mockUser));
    component.ngOnInit();
    const spyUserEditionForm = jest.spyOn(component.userEditionForm, 'setValue');

    // Act
    component.getUserById(userId);
    fixture.detectChanges(true);

    // Assert
    expect(spyGetUserById).toHaveBeenCalledWith(userId);
    expect(spyUserEditionForm).toHaveBeenCalledWith(mockUser);
  });

  it('should not call updateUserById if there are errors', () => {
    // Arrange
    component.ngOnInit();
    component.userEditionForm.get('id').setErrors({ error: 'test' });
    const spyUpdateUser = jest.spyOn(userService, 'updateUser');

    // Act
    component.updateUserById();
    fixture.detectChanges(true);

    // Assert
    expect(spyUpdateUser).not.toHaveBeenCalled();
  });

  it('should updateUserById if there are not errors', () => {
    // Arrange
    component.ngOnInit();
    const mockTranslatedMessage = 'testMsg';
    const mockedUser: User = { birthdate: new Date(), id: 1, name: 'test' };
    const spyUpdateUser = jest.spyOn(userService, 'updateUser').mockReturnValue(of({}));
    const spyTranslateService = jest.spyOn(translateService, 'get').mockReturnValue(of(mockTranslatedMessage));
    const spySnackbarService = jest.spyOn(snackbarService, 'successful');
    component.userEditionForm.get('id').setValue(mockedUser.id);
    component.userEditionForm.get('name').setValue(mockedUser.name);
    component.userEditionForm.get('birthdate').setValue(mockedUser.birthdate);

    // Act
    component.updateUserById();
    fixture.detectChanges(true);

    // Assert
    expect(spyUpdateUser).toHaveBeenCalledWith(mockedUser);
    expect(spyTranslateService).toHaveBeenCalledWith('USER_EDITION.USER_MODIFIED_SUCCESSFULLY');
    expect(spySnackbarService).toHaveBeenCalledWith(mockTranslatedMessage);
  });
});
