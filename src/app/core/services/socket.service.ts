import { Injectable } from '@angular/core';
import * as SocketIO from 'socket.io-client';
import * as Rx from 'rxjs';
import { SOCKET_BASE_URL } from '../constants/url';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() {
    this.socket = SocketIO(SOCKET_BASE_URL);
  }

  /**
   * Function listening to socket events
   */
  listen(event: string) {
    return new Rx.Observable((subscriber: any) => {
      this.socket.on(event, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  /**
   * Fucntion initiating a communation for a given socket event
   */
  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}
