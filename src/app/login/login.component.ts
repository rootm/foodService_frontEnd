import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FoodService} from "../services/food.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // used to get login details from the form
  loginUser(event){
    //disable default loading behavior
    event.preventDefault();
    //collect form data
    const password= event.target.querySelector('#login_pass').value;
    const email = event.target.querySelector('#login_email').value;
    const postDetails =JSON.stringify({"username": email, "password": password});

    // post it to back end with authService
    this.authService.login(email,password);

  }

  constructor(private authService: AuthService) {

  }

  ngOnInit() {

  }

}
