import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProblemListComponent } from './home/problem-list/problem-list.component';
import { TutorialPageComponent } from './home/tutorial-page/tutorial-page.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReferenceComponent } from './reference/reference.component';
import { TopicListComponent } from './topic-list/topic-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'reference', component: ReferenceComponent },
  { path: 'topic-list', component: TopicListComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: ProblemListComponent },
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
