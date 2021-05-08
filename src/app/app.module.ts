import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReferenceComponent } from './reference/reference.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { ProblemListComponent } from './home/problem-list/problem-list.component';
import { TutorialPageComponent } from './home/tutorial-page/tutorial-page.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { FooterComponent } from './footer/footer.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoadingComponent } from './loading/loading.component';
import { FormsModule } from '@angular/forms';
import { ProblemTableComponent } from './home/problem-list/problem-table/problem-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ReferenceComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    ProblemListComponent,
    TutorialPageComponent,
    PageNotFoundComponent,
    ProblemListComponent,
    FooterComponent,
    LoadingComponent,
    ProblemTableComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebaseConfig),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatPasswordStrengthModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
