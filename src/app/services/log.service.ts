import { Injectable } from '@angular/core';
import { Log } from '../modules/log';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  logs!: Log[];
  l!: string;
  private logSource = new BehaviorSubject<Log>({
    id: '',
    text: '',
    date: null,
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') == null) {
      this.logs = [];
    } else {
      //this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(
      this.logs.sort((a, b) => {
        return (b.date = a.date);
      })
    );
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLogs(log: Log) {
    this.logs.unshift(log);
    //add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLogs(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id == cur.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
  }

  deleteLogs(log: Log) {
    this.logs.forEach((cur, index) => {
      if (log.id == cur.id) {
        this.logs.splice(index, 1);
      }
    });
  }

  clearState() {
    this.stateSource.next(true);
  }
}
