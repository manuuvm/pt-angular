import { HttpClientModule } from '@angular/common/http';
import { Injector } from '@angular/core';
import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SnackbarService, UserService } from 'src/app/core/services';
import { MaterialModule } from 'src/app/shared/module/material';
import { SharedModule } from 'src/app/shared/module/shared';
import { SpinnerModule } from 'src/app/shared/module/spinner';
import { UsersComponent } from './users.component';
import { HAMMER_LOADER } from '@angular/platform-browser';

describe('UsersComponent', () => {
  let component: UsersComponent;
  const routerSpy = { navigate: jest.fn() };
  let snackbarService: SnackbarService;
  let userService: UserService;
  let translateService: TranslateService;
  let injector: Injector;
  let fixture: ComponentFixture<UsersComponent>;
  let matDialog: MatDialog;
  const dialogRef = { afterClosed: of } as MatDialogRef<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({}),
        SharedModule,
        MaterialModule,
        RouterTestingModule,
        MatTableModule,
        MatPaginatorModule,
        SpinnerModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [
        UsersComponent,
      ],
      providers: [
        {
          provide: HAMMER_LOADER,
          useValue: () => new Promise(() => { })
        },
        { provide: MatDialog, useValue: { afterOpen: of(dialogRef) } },
        { provide: Router, useValue: routerSpy }
      ],
    }).compileComponents();

    injector = getTestBed();
    matDialog = injector.get(MatDialog);
    translateService = injector.get(TranslateService);
    userService = injector.get(UserService);
    snackbarService = injector.get(SnackbarService);

    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
  }));

  it('ngOnInit', () => {
    // Arrange
    const spyNewUserDialogClose = jest.spyOn(component, 'loadUsersDataSource');
    const spyLoadUsersDataSource = jest.spyOn(component, 'newUserDialogClose');

    // Act
    component.ngOnInit();

    // Assert
    expect(spyLoadUsersDataSource).toHaveBeenCalled();
    expect(spyNewUserDialogClose).toHaveBeenCalled();
  });

  it('applyFilter', () => {
    // Arrange
    const filter = 'test';

    // Act
    component.filterFormControl.setValue(filter);
    component.applyFilter();

    // Assert
    expect(component.usersDataSource.filter).toEqual(filter);
  });

  it('onClickClearButton', () => {
    // Arrange
    const filter = 'test';

    // Act
    component.filterFormControl.setValue(filter);
    component.onClickClearButton();

    // Assert
    expect(component.usersDataSource.filter).toBeNull();
  });

  it('navigateToEditUser', () => {
    // Arrange
    const userEdit = 1;

    // Act
    component.navigateToEditUser(userEdit);

    // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/userEdition', userEdit]);
  });

  it('loadUsersDataSource', () => {
    // Arrange
    const spyGetUsers = jest.spyOn(userService, 'getUsers');

    // Act
    component.loadUsersDataSource();

    // Assert
    expect(spyGetUsers).toHaveBeenCalled();
  });

  it('deleteUser', () => {
    // Arrange
    const userId = 1;
    const mockTranslatedMessage = 'msg';
    const spyDeleteUser = jest.spyOn(userService, 'deleteUser').mockReturnValue(of(null));
    const spyTranslateService = jest.spyOn(translateService, 'get').mockReturnValue(of(mockTranslatedMessage));
    const spySnackbarService = jest.spyOn(snackbarService, 'successful');

    // Act
    component.deleteUser(userId);
    fixture.detectChanges(true);

    // Assert
    expect(spyDeleteUser).toHaveBeenCalledWith(userId);
    expect(spyTranslateService).toHaveBeenCalledWith('USERS.USER_REMOVED_SUCCESSFULLY');
    expect(spySnackbarService).toHaveBeenCalled();
  });

  it('newUserDialogClose', () => {
    // Arrange
    const spyAfterOpen = jest.spyOn(matDialog.afterOpen, 'subscribe');
    const spyAfterClosed = jest.spyOn(dialogRef, 'afterClosed').mockReturnValue(of({ dialogData: { newUserCreated: true } }));
    const spyLoadUsersDataSource = jest.spyOn(component, 'loadUsersDataSource');

    // Act
    component.newUserDialogClose();
    fixture.detectChanges(true);

    // Assert
    expect(spyAfterOpen).toHaveBeenCalled();
    expect(spyAfterClosed).toHaveBeenCalled();
    expect(spyLoadUsersDataSource).toHaveBeenCalled();
  });
});
