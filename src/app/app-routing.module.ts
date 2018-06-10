import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {CardPaymentComponent} from "./payment/card-payment/card-payment.component";
import  {MobilePaymentComponent} from "./payment/mobile-payment/mobile-payment.component";
import  {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'cardpayment', component: CardPaymentComponent},
  {path:'mobilepayment', component: MobilePaymentComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
