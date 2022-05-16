import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/modules/log';
import { BehaviorSubject } from 'rxjs';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit {
  logs!: Log[];
  selecetedLog!: Log;
  loaded = false;
  constructor(private logservice: LogService) {}
  ngOnInit(): void {

    this.logservice.stateClear.subscribe(clear=>{
      if(clear){
        this.selecetedLog={id:'',text:'',date:''};
      }
    });
    this.logservice.getLogs().subscribe((logs) => {
      this.logs = logs;
      this.loaded=true;
    });
  }

  onSelect(log: Log) {
    this.logservice.setFormLog(log);
    this.selecetedLog=log;
  }

  onDelete(log: Log) {
    console.log(12345);
    if (confirm('are u sure?')) {
      this.logservice.deleteLogs(log);
    }
  }


}
