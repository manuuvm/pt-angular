import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService, UserService } from 'src/app/core/services';
import { User } from 'src/app/shared/model';

@Component({
  selector: 'users-page',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'birthdate', 'edit', 'remove'];
  usersDataSource = new MatTableDataSource<User>([]);
  filterFormControl = new FormControl('');

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit(): void {
    this.loadUsersDataSource();
    this.newUserDialogClose();
  }

  newUserDialogClose(): void {
    this.dialog.afterOpen.subscribe((dialogRef) => {
      dialogRef.afterClosed().subscribe((dialogData) => {
        if (dialogData && dialogData.newUserCreated) {
          this.loadUsersDataSource();
        }
      })
    })
  }

  applyFilter(): void {
    this.usersDataSource.filter = this.filterFormControl.value.trim().toLowerCase();
  }

  loadUsersDataSource() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.usersDataSource = new MatTableDataSource<User>(users);
      this.usersDataSource.paginator = this.paginator;
      this.usersDataSource.sort = this.sort;
    })
  }

  onClickClearButton(): void {
    this.filterFormControl.reset();
    this.usersDataSource.filter = null;
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      const updatedUsers = this.usersDataSource.data.filter((user) => user.id !== id);
      this.usersDataSource = new MatTableDataSource<User>(updatedUsers);
      this.usersDataSource.paginator = this.paginator;
      this.translateService.get('USERS.USER_REMOVED_SUCCESSFULLY').subscribe((translatedMessage) => {
        this.snackbarService.successful(translatedMessage);
      });
    })
  }

  navigateToEditUser(id: number) {
    this.router.navigate(['/userEdition', id]);
  }
}
