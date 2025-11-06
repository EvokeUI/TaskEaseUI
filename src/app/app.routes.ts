import { Routes } from '@angular/router';
import { WelcomeLayout } from './layouts/welcome-layout/welcome-layout';
import { UserLayout } from './layouts/user-layout/user-layout';
import { AdminLayout } from './layouts/admin-layout/admin-layout';

export const routes: Routes = [
    {
        path: '', redirectTo: 'welcome-page', pathMatch: 'full'
    },
    {
        path: 'welcome-page', component: WelcomeLayout, 
        children: [
            {
                path: '', loadChildren: () => import('./feature/auth/auth-module').then((m) => m.AuthModule)
            }
        ]
    },
    {
        path: 'user-layout', component: UserLayout,
        children: [
            {
                path: '', loadChildren: () => import('./feature/user/user-module').then((m) => m.UserModule)
            }
        ]
    },
    {
        path: 'admin-layout', component: AdminLayout,
        children: [
            {
                path: '', loadChildren: () => import('./feature/admin/admin-module').then((m) => m.AdminModule)
            }
        ]
    }
];
