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
       console.log(data.token);

       localStorage.setItem('access_token',data.token);
       this.loggedIn=true;
       this.router.navigate(['']);

     }else{
       localStorage.removeItem('access_token');
       this.loggedIn=false;
     }
      console.log(data);
   });

    //localStorage.setItem('access_token',user.token);




  }

  register(userName,fname,lname, password){
    //post login details to the api for validation
    return this.httpClient.post<any>('http://localhost:8080/api/auth/register',{
      username: userName,
      fname: fname,
      lname: lname,
      password: password
    } ).subscribe( (data) => {

      if (data && data.token) {
        console.log(data.token);

        localStorage.setItem('access_token', data.token);
        this.loggedIn=true;
        this.router.navigate(['']);
      }else if(data && data.error === 'exists'){
        this.loggedIn=false;
        alert("User Name exists");
      }else{
        this.loggedIn=false;
        localStorage.removeItem('access_token');
      }
      console.log(data);
    });

    //localStorage.setItem('access_token',user.token);




  }

  //function used to logout from the system
  userLogout(){
    //remove session token rom the storage
    //this will logout the user and redirect to login
    localStorage.removeItem('access_token');
  }

}
