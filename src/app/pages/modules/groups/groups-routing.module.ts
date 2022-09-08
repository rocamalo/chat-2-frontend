import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListGroupsComponent } from './components/list-groups/list-groups.component';

const routes: Routes = [
  {
    path: '',
    component: ListGroupsComponent
  },
  // {
  //   path: 'edit',
  //   component: EditUserComponent
  // }
]; //here goes the paths for components

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsRoutingModule { }
