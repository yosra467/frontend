import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Politique } from './gerer-politique.model';

@Injectable({
  providedIn: 'root'
})
export class GererPolitiqueService {

  public url="http://localhost:9090/api/user/";
  constructor(public http:HttpClient) { }

  getAllPolitique(token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<Politique[]>(this.url+"allPolitique",httpOptions);
  }

  getPolitiqueById(id,token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.get<any>(this.url+"politique/"+id,httpOptions);
  }

  deletePolitique(id,token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.delete<any>(this.url+"deletePolitique/"+id,httpOptions);
  }

  updatePolitique(id,poli:Politique, token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.put<any>(this.url+"updatePolitique/"+id,poli,httpOptions);
  }

  addPolitique(poli:Politique, token){
    var headers_object = new HttpHeaders().set("Authorization",token);
    const httpOptions ={
      headers: headers_object
    };
    return this.http.post<any>(this.url+"ajouterPolitique/",poli,httpOptions);
  }
}
