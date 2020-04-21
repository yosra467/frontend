import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApplicationHoraire } from './appHoraire.model';

@Injectable({
  providedIn: 'root'
})
export class AppHoraireService {

  public url="http://localhost:9090/api/user/";
  constructor(public http:HttpClient) { }

  getAllAppHoraire(token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<ApplicationHoraire[]>(this.url+"allAppHoraire",httpOptions);
  }

  getAppHoraireById(id,token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<any>(this.url+"appHoraire/"+id,httpOptions);
  }

  deleteAppHoraire(id,token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.delete<any>(this.url+"deleteAppHoraire/"+id,httpOptions);
  }

  updateAppHoraire(id,app:ApplicationHoraire, token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.put<any>(this.url+"updateAppHoraire/"+id,app,httpOptions);
  }

  addAppHoraire(app:ApplicationHoraire, token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.post<any>(this.url+"ajouterAppHoraire/",app,httpOptions);
  }
}
