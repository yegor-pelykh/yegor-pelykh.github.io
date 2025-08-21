import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProjectsComponent } from './projects/projects.component';
import { ResumeComponent } from './resume/resume.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const appRoutes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
