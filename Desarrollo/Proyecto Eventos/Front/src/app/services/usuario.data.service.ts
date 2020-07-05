import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Login} from '../models/login';
import {Usuario} from '../models/usuario';

@Injectable()
export class UsuarioDataService {

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

  login(login: Login): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiURL + '/login', login, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  register(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiURL + '/usuarios', usuario, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  findOne(id): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiURL + '/usuarios/' + id, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  update(id, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiURL + '/usuarios/' + id, usuario, this.httpOptions).pipe(retry(1), catchError(this.handleError));
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
