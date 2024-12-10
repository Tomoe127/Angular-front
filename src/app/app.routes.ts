import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'productos',
        loadComponent: () => import('./product-list/product-list.component')
    },
    {
        path: 'usuarios',
        loadComponent: () => import('./user-list/user-list.component')
    },
    {
        path: 'new',
        loadComponent: () => import('./user-form/user-form.component')
    },
    {
        path: '',
        loadComponent: () => import('./user-login/user-login.component')
    },
];
