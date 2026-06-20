import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'home', loadComponent: () => import('./home/home').then(m => m.Home)},
    {path: 'portfolio', loadComponent: () => import('./portfolio/portfolio').then(m => m.Portfolio)},
    {path: 'resume', loadComponent: () => import('./resume/resume').then(m => m.Resume)},
    {path: 'contact', loadComponent: () => import('./contact/contact').then(m => m.Contact)},
    {path: '**', redirectTo: 'home', pathMatch: 'full'}
];
