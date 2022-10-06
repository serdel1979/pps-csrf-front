import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from './middleware/login-guard';
import { LogedGuard } from './middleware/logueado-guard';

const routes: Routes = [
  { path: 'login', 
    component: LoginComponent,
    canActivate : [LoginGuard, LogedGuard]
  },
  { path: 'home', 
    component: HomeComponent,
    canActivate : [LoginGuard]
  },
  { path: '',
    pathMatch: 'full', 
    redirectTo: 'login' 
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
