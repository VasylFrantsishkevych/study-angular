import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {MailLayaoutComponent} from "./layouts/mail-layaout/mail-layaout.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {CarsComponent} from "./components/cars/cars.component";


const routes: Routes = [
  {
    path: '', component: MailLayaoutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'cars', component: CarsComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
