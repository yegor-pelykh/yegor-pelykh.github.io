import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BackgroundComponent } from './background/background.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { CVComponent } from './cv/cv.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ExpanderComponent } from './expander/expander.component';
import { HeaderedContentComponent } from './headered-content/headered-content.component';
import { ContentProjectorComponent } from './content-projector/content-projector.component';

@NgModule({
  declarations: [
    AppComponent,
    BackgroundComponent,
    AboutComponent,
    ProjectsComponent,
    CVComponent,
    ContactsComponent,
    NotFoundComponent,
    ExpanderComponent,
    HeaderedContentComponent,
    ContentProjectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
