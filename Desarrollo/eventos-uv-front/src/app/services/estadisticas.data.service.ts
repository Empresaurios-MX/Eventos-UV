import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {CountResponse, EventoPopularResponse} from '../models/estadisticas';
import Swal from 'sweetalert2';

@Injectable()
export class EstadisticasDataService {

  apiURL = 'https://eventos-uv-api.herokuapp.com/estadisticas';

  constructor(private http: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json'
    })
  };

  contarUsuarios(): Observable<CountResponse> {
    return this.http.get<CountResponse>(this.apiURL + '/contar/usuarios', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  contarEventos(): Observable<CountResponse> {
    return this.http.get<CountResponse>(this.apiURL + '/contar/eventos', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  eventoPopular(): Observable<EventoPopularResponse> {
    return this.http.get<EventoPopularResponse>(this.apiURL + '/popularidad/eventos', this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  usuariosPorEvento(): Observable<[]> {
    return this.http.get<[]>(this.apiURL + '/participantes/eventos', this.httpOptions)
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

    Swal.fire('Error', 'Algo ha salido mal, por favor intentalo más tarde', 'error');

    return throwError(errorMessage);
  }
}
