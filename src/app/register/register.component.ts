import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser(event){
    event.preventDefault();
    const password= event.target.querySelector('#reg_pass').value;
    const email = event.target.querySelector('#reg_email').value;
    const fname = event.target.querySelector('#reg_fname').value;
    const lname = event.target.querySelector('#reg_lname').value;
    const postDetails =JSON.stringify({"username": email, "password": password});

    this.authService.register(email,fname,lname,password);
    console.log(postDetails);
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
