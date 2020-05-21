import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventoDataService {

  apiURL = 'https://eventos-uv-api.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  getEventos(){
    return this.http.get<any>(this.apiURL + '/eventos');
  }
}
