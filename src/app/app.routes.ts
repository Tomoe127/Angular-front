import { Routes } from '@angular/router'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'registro',
        loadComponent: () => import('./registro/registro.component')
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component')
    }
]
