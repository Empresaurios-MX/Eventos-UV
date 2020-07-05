import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UsuarioEvento} from '../models/usuario-evento';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

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

  delete(usuarioEvento: UsuarioEvento) {
    return this.http.delete(this.apiURL + '/usuario-evento', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
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

    window.alert(errorMessage);

    return throwError(errorMessage);
  }
}
