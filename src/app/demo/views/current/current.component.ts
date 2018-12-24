import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { ResponseData } from '../../shared/interfaces/response-data';
import { SubjectService } from '../../shared/services/subject.service';
import { SubjectInstance, InstanceWrapper } from '../../shared/interfaces/subject';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  dataReceived: boolean = false;
  data: any;
  status: any;
  id: any;
  timestamp: number;

  labels: Array<string> = [];
  subjects: Array<InstanceWrapper> = [];

  socData: Observable<any>;
  tempData: Observable<any>;
  voltData: Observable<any>;

  constructor(
    private _subject: SubjectService,
    private _data: DataService,
  ) { }

  ngOnInit() {
    //this._data.getCurrentData().subscribe((res: ResponseData) => {
    this._data.getMockCurrentData().subscribe((res: ResponseData) => {
      this.data = res.data.data
      this.status = res.data.status
      this.id = res.data.id

      this.socData = new Observable(obs => obs.next([{
          label: 'main',
          data: this.data['state_of_charge'],
        },{
          label: 'sub',
          data: this.data['small_bat_soc']
      }]))
      this.tempData = new Observable(obs => obs.next([{
          label: 'main',
          data: this.data['temperature'],
        },{
          label: 'sub',
          data: this.data['small_bat_temp']
      }]))
      this.voltData = new Observable(obs => obs.next([{
          label: 'main',
          data: this.data['voltage'],
        },{
          label: 'sub',
          data: this.data['small_bat_voltage']
      }]))

      Object.keys(this.data).forEach( label => {
        if(!this.timestamp)
          this.timestamp = this.data[label].timestamp
        let wrapper: InstanceWrapper = {
          label: label,
          tv_data: [[this.data[label].timestamp, this.data[label].value]],
          instance: this._subject.createInstance()
        };
        this.labels.push(label)
        this.subjects.push(wrapper)
      })
      this.dataReceived = true;
    })
  }
  setSubject(label){
    let subject;
    for (let s of this.subjects)
      if(s.label == label)
        subject = s
    return subject
  }
}
