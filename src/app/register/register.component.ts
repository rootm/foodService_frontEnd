import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //used to register users
  registerUser(event){
    //disable default load behavior
    event.preventDefault();
    //get details from the the form submitted
    const password= event.target.querySelector('#reg_pass').value;
    const email = event.target.querySelector('#reg_email').value;
    const fname = event.target.querySelector('#reg_fname').value;
    const lname = event.target.querySelector('#reg_lname').value;
    const postDetails =JSON.stringify({"username": email, "password": password});

    //call register on auth service for http post
    this.authService.register(email,fname,lname,password);

  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
