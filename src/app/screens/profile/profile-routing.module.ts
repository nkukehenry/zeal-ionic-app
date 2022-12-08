import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: 'profile',
    component: ProfilePage,
    children: [
      {
            path: 'beneficiaries',
            loadChildren: () => import('../../screens/beneficiaries/beneficiaries.module').then(m => m.BeneficiariesPageModule)
      },
      {
        path: 'refferals',
        loadChildren: () => import('../../screens/refferals/refferals.module').then(m => m.RefferalsPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
