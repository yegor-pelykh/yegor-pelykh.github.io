import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'resume',
    loadComponent: () => import('./resume/resume.component').then(m => m.ResumeComponent)
  },
  {
    path: 'contacts',
    loadComponent: () => import('./contacts/contacts.component').then(m => m.ContactsComponent)
  }
];
