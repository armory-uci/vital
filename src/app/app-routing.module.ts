import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProblemListComponent } from './home/problem-list/problem-list.component';
import { TutorialPageComponent } from './home/tutorial-page/tutorial-page.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReferenceComponent } from './reference/reference.component';

export const routes: Routes = [
  { path: 'reference', component: ReferenceComponent },
  { path: 'loading', component: LoadingComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'problem', component: ProblemListComponent },
      { path: 'tutorial', component: TutorialPageComponent }
    ]
  },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
