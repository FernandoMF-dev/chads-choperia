import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCrudComponent } from './pages/user-crud/user-crud.component';

const routes: Routes = [
  {path: '', component: UserCrudComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
