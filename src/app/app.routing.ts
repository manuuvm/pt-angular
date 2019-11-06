import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditionComponent } from './users/components/userEdition';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'users', component: UsersComponent },
  { path: 'userEdition/:id', component: UserEditionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
