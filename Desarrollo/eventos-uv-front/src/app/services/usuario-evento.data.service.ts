import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioEvento} from '../models/usuario-evento';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, subscribeOn} from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsuarioEventoDataDataService {

  apiURL = 'https://eventos-uv-api.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json'
    })
  };

  

  create(usuarioEvento: UsuarioEvento): Observable<UsuarioEvento> {
    return this.http.post<UsuarioEvento>(this.apiURL + '/usuario-evento', usuarioEvento, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  delete(usuarioEvento: UsuarioEvento){

    let body = {
      eventoId: usuarioEvento.eventoId,
      usuarioId: usuarioEvento.eventoId
    }

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json'
      }),
      body: body
    }

    return this.http.delete(this.apiURL + '/usuario-evento', options).toPromise().catch(this.handleError);
  }

  handleError(error) {
    let errorMessage;

    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    Swal.fire('Error','Algo ha salido mal, por favor intentalo más tarde','error');

    return throwError(errorMessage);
  }
}
