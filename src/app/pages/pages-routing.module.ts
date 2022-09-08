import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [   //we need it to be children so we can display all the modules and routes inside our dashboard
    {
      path: '',
      component: HomeComponent,
    },
      {
        path: 'chat',
        data: { breadcrumb: {alias: 'chat'} },
        loadChildren: () => import('../pages/modules/chat/chat.module').then(m => m.ChatModule)
      },
      {
        path: 'users',
        data: { breadcrumb: {alias: 'users'} },
        loadChildren: () => import('../pages/modules/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'groups',
        data: { breadcrumb: {alias: 'groups'} },
        loadChildren: () => import('../pages/modules/groups/groups.module').then(m => m.GroupsModule)
      },
      {
        data: { breadcrumb: {alias: 'profile'} },
        path: 'profile',
        loadChildren: () => import('../pages/modules/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
