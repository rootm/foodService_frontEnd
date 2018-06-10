import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from "@angular/router";

import { map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private loggedIn =false;

  get loggedInStatus(){
    return this.loggedIn;
  }

  constructor(private httpClient: HttpClient, private router: Router) { }

  //function used for loging validation
  login(userName, password){
    //post login details to the api for validation
    return this.httpClient.post<any>('http://localhost:8080/api/auth/authenticate',{
     username: userName,
     password: password
   } ).subscribe( (data) => {

     if (data && data.token){
       //id data has a token store in local storage to start a session

       localStorage.setItem('access_token',data.token);
       this.loggedIn=true;
       //navigate to home component
       this.router.navigate(['']);

     }else{
       localStorage.removeItem('access_token');
       this.loggedIn=false;
     }

   });






  }

  register(userName,fname,lname, password){
    //post login details to the api for validation
    return this.httpClient.post<any>('http://localhost:8080/api/auth/register',{
      username: userName,
      fname: fname,
      lname: lname,
      password: password
    } ).subscribe( (data) => {
      //if data is recieved and contains token
      if (data && data.token) {
        //set token to the local stoarage to identify the session

        localStorage.setItem('access_token', data.token);
        this.loggedIn=true;
        //navigate to the home page
        this.router.navigate(['']);
      }else if(data && data.error === 'exists'){
        // user name already exists and show error message
        this.loggedIn=false;
        alert("User Name exists");
      }else{
        //server side error occured
        this.loggedIn=false;
        localStorage.removeItem('access_token');
      }

    });

  }

  //function used to logout from the system
  userLogout(){
    //remove session token rom the storage
    //this will logout the user and redirect to login
    localStorage.removeItem('access_token');
    this.router.navigate(['login']);
  }

}
