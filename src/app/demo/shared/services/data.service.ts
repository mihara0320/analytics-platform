import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import * as Highcharts from 'highcharts'
import { ResponseData } from '../interfaces/response-data';

import { chartData, currentData } from './MockResponse/response'

@Injectable()
export class DataService {
  chartDataURL = 'https://us-central1-comodule.cloudfunctions.net/bigquery-data?id=6bb7274b2e44a721&start=1502444288&end=1502450171';
  currentDataURL = 'http://module-dot-comodule.appspot.com/api/module-data/module/6bb7274b2e44a721';

  port = 3000;
  proxyServer = `http://localhost:${this.port}/proxy`;

  constructor(private _http: HttpClient) {}

  lookup(time: number, tv_data: Array<Array<number>>){
    let result: any;
    tv_data.forEach( el => {
      el[0] === time && (result=el[1])
    })
    return result
  }

  getMockChartData(){
    let data: any = chartData()
    return new Observable(obs => {
      setTimeout(()=> obs.next(data), 1000)
    })
  }

  getMockCurrentData(){
    let data: any = currentData()
    return new Observable(obs => {
      setTimeout(()=> obs.next(data), 1000)
    })
  }

  getChartData(): Observable<object>{
    let httpParams = new HttpParams().set('reqestedURL', this.chartDataURL);
    return this._http.get(this.proxyServer, { params: httpParams })
  }
  getCurrentData(): Observable<object>{
    let httpParams = new HttpParams().set('reqestedURL', this.currentDataURL);
    return this._http.get(this.proxyServer, { params: httpParams }).map( res => res)
  }
  sortChartData(res: ResponseData){
    let data: Array<any> = res.data
    let headers: Array<string> = data.shift() //convert timestamp and time here
    let values: Array<number> = data
    let datasets: object = {};
    headers.forEach((label, i) => datasets[label] = values.map(el => el[i]))

    let tv_data = {}
    headers.forEach((header, i) => {
      header !== 'timestamp_sec' && (tv_data[header] = Highcharts.map(datasets[header], (val, j) => {
        return [datasets['timestamp_sec'][j]*1000, val];
      }))
    })
    return tv_data
  }

}
