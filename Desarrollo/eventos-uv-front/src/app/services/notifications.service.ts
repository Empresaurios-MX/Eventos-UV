import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { take, retry, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notification } from '../models/notification';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireDB: AngularFireDatabase, private angularFireAuth: AngularFireAuth, private angularFireMessaging: AngularFireMessaging, private http: HttpClient) {

  }

  apiSend = 'https://fcm.googleapis.com/fcm/send';

  sendNotification(notification: Notification) {

    let body = {
      'notification': {
        'title': notification.title,
        'body': notification.body,
        'click_action': notification.link,
        'icon': notification.icon
      },
      "to":
      "eq8VQsnbDOg678vaflCUhb:APA91bEKKXWIotv-b1faFHBpTLlYaqmuEmbO38YA4K4o41-EHCFtTSx4HeIyCvZkuyawlxfvhY3xbTQNCPgIJ0dJwytqKpXltMtMqrPWW1hnDSd2gIKEeIP1KbOX0hqWdTPmafTO6REC"

    }

    //Enviar notificaciones en segundo plano
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
        'Authorization': 'key = AAAACnh-Ftk:APA91bHV2-NOwszkbxBCOIzB-BsUh4-eDAjROotAV650wt6uIPYeD1-kabw1J3YI1g7wAOefFep-fu2bofXOmgD39m4U5Sa5QCLkTqBkSmFLTQ2ieAn-lI23UBfcczQ_LmSg80-5Bl3L'
      }),
      body: body
    };

    return this.http.post(this.apiSend, httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error) {
    let errorMessage = '';

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

  /**
   * update token in firebase database
   * 
   * @param userId userId as a key 
   * @param token token as a value
   */
  updateToken(userId, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(
      () => {
        const data = {};
        data[userId] = token
        this.angularFireDB.object('fcmTokens/').update(data)
      })
  }

  /**
   * request permission for notification from firebase cloud messaging
   * 
   * @param userId userId
   */
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        this.updateToken(userId, token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  /**
   * hook method when new notification received in foreground
   */
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
}
