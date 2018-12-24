import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as Highcharts from 'highcharts';
import { ResponseData } from '../interfaces/response-data';

import { chartData, currentData } from './MockResponse/response';

@Injectable()
export class DataService {
  port = 3000;
  proxyServer = `http://localhost:${this.port}/proxy`;

  constructor(private _http: HttpClient) {}

  lookup(time: number, tv_data: Array<Array<number>>) {
    let result: any;
    tv_data.forEach( el => {
      el[0] === time && (result = el[1]);
    });
    return result;
  }

  getMockChartData(){
    const data: any = chartData();
    return new Observable(obs => {
      setTimeout(() => obs.next(data), 1000);
    });
  }

  getMockCurrentData(){
    const data: any = currentData();
    return new Observable(obs => {
      setTimeout(() => obs.next(data), 1000);
    });
  }

  sortChartData(res: ResponseData){
    const data: Array<any> = res.data;
    const headers: Array<string> = data.shift(); // convert timestamp and time here
    const values: Array<number> = data;
    const datasets: object = {};
    headers.forEach((label, i) => datasets[label] = values.map(el => el[i]));

    const tv_data = {};
    headers.forEach((header, i) => {
      header !== 'timestamp_sec' && (tv_data[header] = Highcharts.map(datasets[header], (val, j) => {
        return [datasets['timestamp_sec'][j] * 1000, val];
      }));
    });
    return tv_data;
  }

}
