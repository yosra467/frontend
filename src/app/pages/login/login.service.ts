import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
  })
  export class LoginService {
  
    private url = 'http://localhost:9090/login';
  
    constructor(private http:HttpClient) { }
   jwt : any;
   role: any;
   email: any;
   login(data){
      return this.http.post<any>(this.url,data, {observe :'response'});
    }

    saveToken(value: any){
       this.jwt = value;
       localStorage.setItem('token',this.jwt);
       const helper = new JwtHelperService();
       this.role = helper.decodeToken(this.jwt).role;
       this.email = helper.decodeToken(this.jwt).email;
    }

    loadToken(){
      this.jwt = localStorage.getItem('token');
      const helper = new JwtHelperService();
       this.role = helper.decodeToken(this.jwt).role;
       this.email = helper.decodeToken(this.jwt).email;
    }
  
    logout(){
      localStorage.removeItem('token');
      this.jwt = null;
      this.role = null;
      this.email = null ;
    }
    isLoggedIn(){
      let token = localStorage.getItem("Authorization");
      if (token) {
        return true;
      }
      return false;
    }
  
    isLoggedAdmin(){
    if(this.role[0].authority == "admin") return true;
    else return false;
    }
    isResponsable_rh(){
      if(this.role[0].authority == "responsable_rh") return true;
    else return false;
    }
  
  }
  