import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Evento} from '../models/evento';
import Swal from 'sweetalert2';

@Injectable()
export class EventoDataService {

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

  findAll(): Observable<Evento> {
    return this.http.get<Evento>(this.apiURL + '/eventos', this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  findOne(id): Observable<Evento> {
    return this.http.get<Evento>(this.apiURL + '/eventos/' + id, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  create(evento: Evento): Observable<Evento> {
    const fechaFragments = evento.fecha.split('-');
    const horaFragments = evento.hora.split(':');
    const realDate = new Date(fechaFragments[2] + '-' + fechaFragments[1] + '-' + fechaFragments[0]);

    realDate.setHours(parseInt(horaFragments[0], 0), parseInt(horaFragments[1], 0), parseInt(horaFragments[2], 0));

    evento.fecha = realDate.toISOString();

    return this.http.post<Evento>(this.apiURL + '/eventos', evento, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete(this.apiURL + '/eventos/' + id, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  }

  update(id, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(this.apiURL + '/eventos/' + id, evento, this.httpOptions).pipe(retry(1), catchError(this.handleError));
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
