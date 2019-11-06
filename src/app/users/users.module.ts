import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/shared/module/material';
import { SharedModule } from 'src/app/shared/module/shared';
import { SpinnerModule } from 'src/app/shared/module/spinner';
import { TranslatedMatPaginator } from '../shared/config';
import { UsersComponent } from './users.component';
import { UserEditionComponent } from './components/userEdition';
import { NewUserDialogComponent } from '../shared/components/newUserDialog';

@NgModule({
  declarations: [
    UsersComponent,
    NewUserDialogComponent,
    UserEditionComponent,
  ],
  imports: [
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSortModule,
    MaterialModule,
    SpinnerModule,
  ],
  exports: [
    UserEditionComponent,
  ],
  entryComponents: [NewUserDialogComponent],
  providers: [
    { provide: MatPaginatorIntl, useClass: TranslatedMatPaginator },
  ],
  bootstrap: []
})
export class UsersModule { }
