import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { SubjectService } from '../../shared/services/subject.service';
import { SubjectInstance, InstanceWrapper } from '../../shared/interfaces/subject';
import { Observable } from 'rxjs/Observable';
import * as Highcharts from 'highcharts'
import { config } from './config'

@Component({
  selector: 'stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss']
})
export class StockChartComponent implements OnInit {
  @Input('tv_data_obs') tv_data: object;
  @Input('subjects') subjects: Array<InstanceWrapper>;
  @ViewChild('instance') instance: any;

  options: any;

  constructor(
    private elRef: ElementRef,
    private _data: DataService,
    private _subject: SubjectService
  ) { }

  ngOnInit() {
    this.options = config(this.tv_data)
  }
  onPointMouseOver (event) {
    let currentTime = event.context.x

    this.subjects.forEach( el => el.instance.send(this._data.lookup(currentTime, this.tv_data[el.label])))
  }

}
