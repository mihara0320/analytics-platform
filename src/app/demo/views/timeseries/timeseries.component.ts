import { Component, OnInit, ElementRef } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { SubjectService } from '../../shared/services/subject.service';
import { SubjectInstance, InstanceWrapper } from '../../shared/interfaces/subject';
import { ResponseData } from '../../shared/interfaces/response-data';
import { Observable } from 'rxjs/Observable';
import * as Highcharts from 'highcharts'
import { config } from './config'

@Component({
  selector: 'app-timeseries',
  templateUrl: './timeseries.component.html',
  styleUrls: ['./timeseries.component.scss']
})
export class TimeseriesComponent implements OnInit {
  dataReceived: boolean = false;

  tv_data: object = {};
  tv_data_obs: Observable<object>;
  labels: Array<string> = [];
  subjects: Array<InstanceWrapper> = [];

  constructor(
    private _data: DataService,
    private _subject: SubjectService
  ) { }

  ngOnInit() {
    // this._data.getChartData().subscribe((res: ResponseData) => {
    this._data.getMockChartData().subscribe((res: ResponseData) => {
      this.tv_data = this._data.sortChartData(res)
      this.tv_data_obs = new Observable( observer => {
        observer.next(this.tv_data)
      })
      Object.keys(this.tv_data).forEach( label => {
        let wrapper: InstanceWrapper = {
          label: label,
          tv_data: this.tv_data[label],
          instance: this._subject.createInstance()
        };
        this.labels.push(label)
        this.subjects.push(wrapper)
      })
      this.dataReceived = true
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
