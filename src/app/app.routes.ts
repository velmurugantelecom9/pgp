import { Routes } from '@angular/router';

export const routes: Routes = [
      {
    path: '',
    loadComponent: () =>
      import('./component/home/home').then(m => m.Home)
  },
];
