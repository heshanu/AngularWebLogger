import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/modules/log';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css'],
})
export class LogFormComponent implements OnInit {
  isNew = true;
  id!: string;
  text!: string;
  date!: any;
  constructor(private loginservice: LogService) {}

  ngOnInit(): void {
    //sub to seletedlog observables
    this.loginservice.selectedLog.subscribe((log) => {
      if (log.id !== null) {
        this.isNew = false;
        (this.id = log.id), (this.text = log.text), (this.date = log.date);
      }
    });
  }

  onSubmit() {
    //console.log(123); check if new log
    if (this.isNew) {
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date(),
      };
      this.loginservice.addLogs(newLog);
    } else {
      //update
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date(),
      };
      this.loginservice.updateLogs(updLog);
    }

    //clear state
    this.clearState();
  }

  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';

    this.loginservice.clearState();
  }
  generateId(): string {
    return 'xxxx-xxxx-xxx-xxxx'.replace(/[x]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
