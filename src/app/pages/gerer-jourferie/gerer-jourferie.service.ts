import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Politique } from '../gerer-poli/gerer-politique.model';
import { jourferie } from './gerer-jourferie.model';

@Injectable({
  providedIn: 'root'
})
export class GererJourferieService {

  public url = "http://localhost:9090/api/user/";
  constructor(public http: HttpClient) { }

  getAllPolitique(token) {
    var headers_object = new HttpHeaders().set("Authorization", token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<Politique[]>(this.url + "allPolitique", httpOptions);
  }

  getAllJour(token) {
    var headers_object = new HttpHeaders().set("Authorization", token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<jourferie[]>(this.url + "allJour", httpOptions);
  }

  getJourById(id, token) {
    var headers_object = new HttpHeaders().set("Authorization", token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.get<any>(this.url + "id/" + id, httpOptions);
  }

  deleteJour(id, token) {
    var headers_object = new HttpHeaders().set("Authorization", token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.delete<any>(this.url + "deleteJour/" + id, httpOptions);
  }

  updateJour(id, jourferie: jourferie, token) {
    var headers_object = new HttpHeaders().set("Authorization", token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.put<any>(this.url + "updateJour/" + id, jourferie, httpOptions);
  }

  addJour(jour: jourferie, token) {
    var headers_object = new HttpHeaders().set("Authorization", token);
    const httpOptions = {
      headers: headers_object
    };
    return this.http.post<any>(this.url + "ajouterJour/", jour, httpOptions);
  }
}
