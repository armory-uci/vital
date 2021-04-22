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
import { TopicListComponent } from './topic-list/topic-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

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
    TopicListComponent
  ],
  imports: [
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: 'AIzaSyA_08j-qQznU7TwDNPNK8WrbUkZo5QGtdM',
      authDomain: 'vital-8262d.firebaseapp.com',
      projectId: 'vital-8262d',
      storageBucket: 'vital-8262d.appspot.com',
      messagingSenderId: '253296918538',
      appId: '1:253296918538:web:61ee5a41302d2d72ac9ff3',
      measurementId: 'G-MF7ES3S7H6'
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
<<<<<<< HEAD
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
=======
    MatPasswordStrengthModule
>>>>>>> a24caf5449bc3b29535da10c74587e04a6be69a5
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
