import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from './gerer-role.model';

@Injectable({
  providedIn: 'root'
})
export class GererRoleService {

  public url="http://localhost:9090/api/user/";
  constructor(public http:HttpClient) { }

  getAllRole(token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<Role[]>(this.url+"allRole",httpOptions);
  }

  getRoleById(id,token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<any>(this.url+"role/"+id,httpOptions);
  }

  deleteRole(id,token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.delete<any>(this.url+"deleteRole/"+id,httpOptions);
  }

  updateRole(id,role:Role, token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.put<any>(this.url+"updateRole/"+id,role,httpOptions);
  }

  addRole(role:Role, token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.post<any>(this.url+"ajouterRole/",role,httpOptions);
  }
}
