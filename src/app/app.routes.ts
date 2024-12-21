import { Routes } from '@angular/router'
import { CarritoComponent } from './carrito/carrito.component';
import { AuthGuard } from './auth.guard';

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
    },
    {
        path: 'productos',
        loadComponent: () => import('./product-list/product-list.component'), canActivate: [AuthGuard]
    },
    {
        path: 'carrito',
        component:CarritoComponent,
        canActivate: [AuthGuard]
    },
     
]
