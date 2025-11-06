import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'auth', pathMatch: 'full',
    },
    {
        path: 'auth', loadChildren: ()=> import('./feature/auth/auth-module').then((m) => m.AuthModule)
    },
    {
        path: 'user', loadChildren: ()=> import('./feature/user/user-module').then((m) => m.UserModule)
    },
    {
        path: 'admin', loadChildren: ()=> import('./feature/admin/admin-module').then((m) => m.AdminModule)
    }
];
