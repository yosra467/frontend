import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user, Departement } from './gerer-emp.model';

@Injectable({
  providedIn: 'root'
})
export class GererEmpService {

  public url="http://localhost:9090/api/user/";
  constructor(public http:HttpClient) { }

  getAllUser(token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<user[]>(this.url+"all",httpOptions);
  }

  getAllDepartement(token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<Departement[]>(this.url+"allDepartement",httpOptions);
  }

  getUserById(id,token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<any>(this.url+"id/"+id,httpOptions);
  }

  deleteUser(id,token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.delete<any>(this.url+"deleteUser/"+id,httpOptions);
  }

  updateUser(id,user:user, token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.put<any>(this.url+"updateUser/"+id,user,httpOptions);
  }

  addUser(user:user, token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.post<any>(this.url+"ajouterUser/",user,httpOptions);
  }
}
