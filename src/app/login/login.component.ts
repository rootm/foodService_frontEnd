import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {FoodService} from "../services/food.service";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser(event){
    event.preventDefault();
    const password= event.target.querySelector('#login_pass').value;
    const email = event.target.querySelector('#login_email').value;
    const postDetails =JSON.stringify({"username": email, "password": password});

    this.authService.login(email,password);
    console.log(postDetails);
  }

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    console.log("login");
  }

}
